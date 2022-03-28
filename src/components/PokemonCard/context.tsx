import { createContext, useContext, useState } from "react";
import { PokemonDetail } from "src/types/PokemonDetail";

interface Values {
  pokemon?: PokemonDetail;
  setPokemon?: (value: PokemonDetail) => void;
}

const PokemonContext = createContext<Values>({});

interface Props {
  children: JSX.Element[] | JSX.Element;
  initialValue: PokemonDetail | undefined;
}

export const PokemonProvider = ({ children, initialValue }: Props) => {
  const [pokemon, setPokemon] = useState(initialValue);

  return (
    <PokemonContext.Provider value={{ pokemon, setPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  return useContext(PokemonContext);
};
