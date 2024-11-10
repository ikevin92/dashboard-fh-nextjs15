import { PokemonGrid, PokemonsResponse, SimplePokemon } from "@/pokemons";

export const metadata = {
  title: "151 Pokémons",
  description: "Ad minim sit cupidatat culpa consectetur.",
};

const getPokemons = async (
  limit = 20,
  offset = 0,
): Promise<SimplePokemon[]> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?${new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    })}`,
  );
  const data: PokemonsResponse = await response.json();

  const pokemons = data.results.map((pokemon) => {
    return {
      id: pokemon.url.split("/").at(-2)!,
      name: pokemon.name,
    };
  });

  // throw new Error("Error al cargar los pokemons");
  // throw notFound();

  return pokemons;
};

export default async function PokemonsPage() {
  const pokemons = await getPokemons(151);

  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">
        Listado de Pokemons <small className="text-blue-500">estatico</small>
      </span>

      <PokemonGrid pokemons={pokemons} />
    </div>
  );
}
