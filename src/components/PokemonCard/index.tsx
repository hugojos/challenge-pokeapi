import { useRouter } from "next/router";
import React from "react";
import useFetchPokemonDetail from "src/services/useFetchPokemonDetail";
import { Pokemon } from "src/services/useFetchPokemons";
import { PokemonProvider } from "./context";
import { Pokedex, Types } from "./tags";

interface Props {
  pokemon: Pokemon;
  children?: JSX.Element[] | JSX.Element;
  className?: string;
  imgClassName?: string;
}

const PokemonCard = ({ pokemon, children, className, imgClassName }: Props) => {
  const router = useRouter();
  const { data, isLoading } = useFetchPokemonDetail(pokemon.name);

  if (isLoading) return null;

  return (
    <PokemonProvider initialValue={data}>
      <div
        className={`text-left ${className}`}
        onClick={() => router.push(`/${pokemon.name}`)}
      >
        <div className="border border-black relative">
          <div className="absolute top-1 left-1">{children}</div>
          <img
            className={`w-full ${imgClassName}`}
            src={data?.sprites?.front_default}
            alt={pokemon.name}
          />
        </div>
        <span className="font-bold">{pokemon.name}</span>
      </div>
    </PokemonProvider>
  );
};

PokemonCard.Types = Types;

PokemonCard.Pokedex = Pokedex;

export default PokemonCard;
