import { useInfiniteQuery, UseInfiniteQueryOptions } from "react-query";
import { api } from "src/api";
import { endpoints } from "../config/endpoints";
import { Pagination } from "../types/Pagination";

export interface Pokemon {
  name: string;
  url?: string;
}

type Options = Omit<
  UseInfiniteQueryOptions<Pagination<Pokemon>>,
  "queryKey" | "queryFn"
>;

const useFetchPokemons = (options: Options = {}) => {
  return useInfiniteQuery<Pagination<Pokemon>>(
    "pokemons",
    ({ pageParam = 0 }) =>
      api(endpoints.pokemons({ limit: 9, offset: pageParam * 9 })),
    {
      getNextPageParam: (lastPage, pages) => {
        return pages.length;
      },
      ...options,
    }
  );
};

export default useFetchPokemons;
