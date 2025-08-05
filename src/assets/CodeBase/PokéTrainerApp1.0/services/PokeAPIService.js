// In-memory cache to store fetched Pokémon details and avoid re-fetching during the app session.
const pokemonCache = new Map();

/**
 * =====================================================================================
 * 1. FETCH A LIST OF POKÉMON (LIGHTWEIGHT)
 * =====================================================================================
 *
 * - Endpoint: GET https://pokeapi.co/api/v2/pokemon
 * - Parameters:
 *   - `limit`: Controls how many Pokémon names to return.
 *   - `offset`: The starting position in the full Pokémon list.
 *
 * This function is the efficient first step for loading a generation. It only fetches
 * a list of names and URLs, making it very fast.
 */
export const fetchPokemonList = async (generation = '1') => {
  const generationEndpoints = {
    '1': { limit: 151, offset: 0 },
    '2': { limit: 100, offset: 151 },
    '3': { limit: 135, offset: 251 },
    '4': { limit: 107, offset: 386 },
    '5': { limit: 156, offset: 493 },
    '6': { limit: 72, offset: 649 },
    '7': { limit: 88, offset: 721 },
    '8': { limit: 96, offset: 809 },
    '9': { limit: 120, offset: 905 },
    'all': { limit: 1025, offset: 0 },
  };

  const endpoint = generationEndpoints[generation] || generationEndpoints['1'];
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${endpoint.limit}&offset=${endpoint.offset}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    // Add the ID to each entry for easier lookups later
    return data.results.map(p => ({
      ...p,
      id: p.url.split('/')[6],
    }));
  } catch (error) {
    console.error(`Failed to fetch Pokémon list for generation ${generation}:`, error);
    return [];
  }
};

/**
 * =====================================================================================
 * 2. FETCH FULL DETAILS FOR A BATCH OF POKÉMON (EFFICIENT & CONCURRENT)
 * =====================================================================================
 *
 * This function takes a list of Pokémon (from the function above) and fetches the
 * full details for all of them concurrently using Promise.all. This is much faster
 * than fetching them one by one. It also uses the cache to avoid re-fetching.
 */
export const fetchPokemonDetailsByList = async (pokemonList) => {
  try {
    const detailPromises = pokemonList.map(p => fetchFullPokemonDetails(p.id));
    return await Promise.all(detailPromises);
  } catch (error) {
    console.error('Failed to fetch Pokémon details for list:', error);
    return [];
  }
};

/**
 * =====================================================================================
 * 3. FETCH FULL DETAILS FOR A SINGLE POKÉMON (HEAVYWEIGHT)
 * =====================================================================================
 *
 * - Endpoint: GET https://pokeapi.co/api/v2/pokemon/{id}
 * - Parameters:
 *   - `id`: The ID of the Pokémon to fetch.
 *
 * This is the "heavy" call used to get all data for the Pokémon Detail screen.
 * It checks the cache first to see if we already have the data.
 */
export const fetchFullPokemonDetails = async (id) => {
  if (pokemonCache.has(id)) {
    return pokemonCache.get(id);
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    pokemonCache.set(id, data); // Store the result in the cache
    return data;
  } catch (error) {
    console.error(`Failed to fetch details for Pokémon ${id}:`, error);
    return null; // Return null on error
  }
};

/**
 * =====================================================================================
 * 4. SEARCH FOR A POKÉMON BY NAME
 * =====================================================================================
 *
 * This is a simple alias for fetching a single Pokémon's details, used by the
 * search bar. It returns the result in an array to match the list format.
 */
export const searchPokemon = async (query) => {
  if (!query) return [];
  try {
    // The API requires lowercase for search queries
    const result = await fetchFullPokemonDetails(query.toLowerCase());
    return result ? [result] : [];
  } catch (error) {
    return []; // Return empty array if search fails
  }
};
