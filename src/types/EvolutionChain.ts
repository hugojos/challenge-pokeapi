export interface Chain {
  evolves_to?: Chain[];
  species?: {
    name: string;
    url: string;
  };
}

export interface EvolutionChain {
  id: number;
  chain: Chain;
}
