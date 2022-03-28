const BASE_URL = "https://pokeapi.co/api/v2";

const api = async (url: string) => {
  const data = await fetch(BASE_URL + url);
  return await data.json();
};

export { api };
