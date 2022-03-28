import { api } from "src/api";
import { endpoints } from "src/config/endpoints";
import { Pagination } from "src/types/Pagination";
import PokemonCard from "../src/components/PokemonCard";
import Layout from "../src/layouts/Layout";
import useFetchPokemons, { Pokemon } from "../src/services/useFetchPokemons";

interface Props {
  initialData: Pagination<Pokemon>;
}

const Home = ({ initialData }: Props) => {
  const { data, fetchNextPage, isLoading } = useFetchPokemons({
    initialData: () => ({
      pageParams: [0],
      pages: [initialData],
    }),
  });

  return (
    <Layout className="text-center">
      <div className="grid gap-2 cursor-pointer grid-cols-1 md:grid-cols-3">
        {data?.pages.map((page) =>
          page.results?.map((result) => (
            <PokemonCard key={result.url} pokemon={result}>
              <PokemonCard.Types />
            </PokemonCard>
          ))
        )}
      </div>
      <button
        disabled={isLoading}
        className="mt-5 font-bold cursor-pointer disabled:cursor-wait"
        onClick={() => fetchNextPage()}
      >
        Load more
      </button>
    </Layout>
  );
};

export async function getStaticProps() {
  const result = await api(endpoints.pokemons({ limit: 9, offset: 9 }));
  return {
    props: {
      initialData: result,
    },
  };
}

export default Home;
