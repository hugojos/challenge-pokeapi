import { useQuery } from "react-query";
import { api } from "src/api";
import { endpoints } from "src/config/endpoints";

interface Type {
  slot: number;
  type: {
    name: string;
  };
}

interface PokemonDetail {
  sprites: {
    front_default: string;
  };
  types: Type[];
}

const useFetchPokemonDetail = (name: string) =>
  useQuery<PokemonDetail>(["pokemon", name], () =>
    api(endpoints.pokemon({ name }))
  );

export default useFetchPokemonDetail;
