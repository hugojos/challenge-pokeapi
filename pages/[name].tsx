import { GetStaticPropsContext } from "next";
import { api } from "src/api";
import PokemonCard from "src/components/PokemonCard";
import { endpoints } from "src/config/endpoints";
import Layout from "src/layouts/Layout";
import { Pokemon } from "src/services/useFetchPokemons";
import { Chain, EvolutionChain } from "src/types/EvolutionChain";
import { Pagination } from "src/types/Pagination";
import { PokemonDetail } from "src/types/PokemonDetail";
import { PokemonSpecies } from "src/types/PokemonSpecies";

interface Props {
  name: string;
  image: string;
  habitat: string;
  description: string;
  evolutions: PokemonDetail[];
}

const { Types, Pokedex } = PokemonCard;

const Name = ({ name, image, habitat, evolutions, description }: Props) => {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
        <div className="">
          <img src={image} alt={name} className="w-full border border-black" />
        </div>
        <div className="">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p>{habitat ? `habitat: ${habitat}` : "Sin habitat"}</p>
        </div>
      </div>
      <div className="my-5">
        <h2 className="font-bold border-b border-black w-fit mb-2">
          Descripción
        </h2>
        <p>{description}</p>
      </div>
      <div className="overflow-x-scroll whitespace-nowrap scroll pb-3">
        {evolutions.map((evolution: PokemonDetail) => (
          <PokemonCard
            key={evolution.name}
            className="inline-block w-full md:w-6/12 cursor-pointer"
            pokemon={evolution}
          >
            <Types />
            <Pokedex />
          </PokemonCard>
        ))}
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const data: Pagination<Pokemon> = await api(
    endpoints.pokemons({ offset: 0, limit: 2000 })
  );
  const paths = data.results?.map((pokemon) => ({
    params: { name: pokemon.name },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const { params } = ctx;

  const pokemonDetail: PokemonDetail = await api(
    endpoints.pokemon({ name: params?.name + "" })
  );

  const species: PokemonSpecies = await (
    await fetch(pokemonDetail.species!.url)
  ).json();

  const evolutionChain: EvolutionChain = await (
    await fetch(species.evolution_chain.url)
  ).json();

  const results = await Promise.all(
    chainToArray(evolutionChain.chain).map((evolution: any) => {
      // convert chainEvolution to array and fetch each pokemon detail
      const urlSegments = evolution.url.split("/");
      const id = urlSegments[urlSegments.length - 2];
      return api(endpoints.pokemon({ name: id }));
    })
  );

  const evolutions: PokemonDetail[] = results
    .map((result) => {
      const { name, sprites } = result;
      return { name, sprites };
    })
    .filter((pokemon) => pokemon.name !== params?.name); // remove current pokemon

  const description = species.flavor_text_entries.find(
    (entries) => entries.language.name === "es"
  )?.flavor_text; // get description in es

  return {
    props: {
      image: pokemonDetail.sprites?.front_default,
      name: params?.name,
      habitat: species.habitat?.name ?? null,
      description,
      evolutions,
    },
  };
}

//move to helper
const chainToArray = (data: Chain, acc: any = []) => {
  acc.push(data.species);
  data.evolves_to?.forEach((item) => {
    if (item.evolves_to && item.evolves_to.length > 0) {
      chainToArray(item, acc);
    } else {
      acc.push(item.species);
    }
  });
  return acc;
};

export default Name;
