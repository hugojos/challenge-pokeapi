const endpoints = {
  pokemons: ({ limit = 0, offset = 0 }) =>
    `/pokemon?offset=${offset}&limit=${limit}`,
  pokemon: ({ name = "" }) => `/pokemon/${name}`,
  pokemonSpecies: ({ name = "" }) => `/pokemon-species/${name}`,
};

export { endpoints };
