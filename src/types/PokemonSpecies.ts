export interface Habitat {
  name: string;
  url: string;
}

export interface PokedexNumbers {
  entry_number: number;
  pokedex: {
    name: string;
    url: string;
  };
}

export interface TextEntries {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
}

export interface PokemonSpecies {
  habitat: Habitat;
  pokedex_numbers: PokedexNumbers[];
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: TextEntries[];
}
