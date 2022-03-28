import { useQuery } from "react-query";
import { usePokemonContext } from "./context";

export const Types = () => {
  const { pokemon } = usePokemonContext();

  return (
    <div>
      {pokemon?.types?.map((item) => (
        <span
          key={item.type.name}
          className="border border-gray-900 mt-1 mr-1 px-1"
        >
          {item.type.name}
        </span>
      ))}
    </div>
  );
};

export const Pokedex = () => {
  const { pokemon } = usePokemonContext();

  const { data } = useQuery([pokemon?.name, "species"], async () => {
    return await (await fetch(pokemon!.species!.url)).json();
  });

  return (
    <span
      key={data?.pokedex_numbers[0].entry_number}
      className="border border-gray-900 mt-1 mr-1 px-1"
    >
      pokedex: {data?.pokedex_numbers[0].entry_number}
    </span>
  );
};
