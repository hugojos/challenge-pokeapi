import { createContext, useContext, useState } from "react";
import { Pokemon } from "src/services/useFetchPokemons";

interface Values {
  pokemon?: Pokemon;
  setPokemon?: (value: Pokemon) => void;
}

const PokemonContext = createContext<Values>({});

interface Props {
  children: JSX.Element[] | JSX.Element;
  initialValue: Pokemon;
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
