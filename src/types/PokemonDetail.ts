interface Type {
  slot: number;
  type: {
    name: string;
  };
}

export interface PokemonDetail {
  sprites?: {
    front_default: string;
  };
  id?: number;
  types?: Type[];
  name: string;
  species?: {
    name: string;
    url: string;
  };
}
