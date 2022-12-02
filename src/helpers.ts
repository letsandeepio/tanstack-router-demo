import axios from 'axios';


interface ApiResponse {
  results: CharacterType[]
}

type CharacterType = {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
};


export async function fetchCharacters() {
  console.log("Fetching characters...");
  await new Promise((r) => setTimeout(r, 500));
  return axios
    .get<ApiResponse>("https://rickandmortyapi.com/api/character")
    .then((r) => r.data.results.slice(0, 10));
}

export async function fetchCharacterById(characterId: string) {
  console.log(`Fetching character with id ${characterId}...`);
  await new Promise((r) => setTimeout(r, 500));

  return await axios
    .get<CharacterType>(`https://rickandmortyapi.com/api/character/${characterId}`)
    .then((r) => r.data);
}
