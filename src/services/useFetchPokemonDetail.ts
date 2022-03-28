import { useQuery } from "react-query";
import { api } from "src/api";
import { endpoints } from "src/config/endpoints";
import { PokemonDetail } from "src/types/PokemonDetail";

const useFetchPokemonDetail = (name: string) =>
  useQuery<PokemonDetail>(["pokemon", name], () =>
    api(endpoints.pokemon({ name }))
  );

export default useFetchPokemonDetail;
