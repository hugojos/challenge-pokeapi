import { useQuery } from "react-query";
import { api } from "src/api";
import { endpoints } from "src/config/endpoints";
import { PokemonSpecies } from "src/types/PokemonSpecies";

const useFetchPokemonSpecies = (name: string) =>
  useQuery<PokemonSpecies>(["species", name], () =>
    api(endpoints.pokemonSpecies({ name }))
  );

export default useFetchPokemonSpecies;
