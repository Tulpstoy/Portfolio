import { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import GenerationFilter from '../components/GenerationFilter';
import SearchBar from '../components/SearchBar';
import '../styles/Home.css';

const GENERATIONS = {
  1: { start: 1, end: 151 },
  2: { start: 152, end: 251 },
  3: { start: 252, end: 386 },
  4: { start: 387, end: 493 },
  5: { start: 494, end: 649 },
  6: { start: 650, end: 721 },
  7: { start: 722, end: 809 },
  8: { start: 810, end: 905 },
  9: { start: 906, end: 1010 }
};

const SPECIAL_FORMS = {
  mega: [
    // Mega Evolution Pokémon IDs
    3, 6, 9, 15, 18, 65, 80, 94, 115, 127, 130, 142, 150, 181, 212, 214, 229, 248, 
    257, 282, 303, 306, 308, 310, 354, 359, 380, 381, 445, 448, 460
  ],
  gmax: [
    // Gigantamax Pokémon IDs
    3, 6, 9, 12, 25, 52, 68, 94, 99, 131, 133, 143, 569, 809, 812, 815, 818, 823, 
    826, 834, 839, 841, 842, 844, 849, 851, 858, 861, 869, 879, 884, 892
  ],
  alola: [
    // Alolan form Pokémon IDs
    19, 20, 26, 27, 28, 37, 38, 50, 51, 52, 53, 74, 75, 76, 88, 89, 103, 105
  ],
  galar: [
    // Galarian form Pokémon IDs
    52, 77, 78, 83, 110, 122, 222, 263, 264, 554, 555, 562, 618
  ],
  hisui: [
    // Hisuian form Pokémon IDs
    58, 59, 100, 101, 157, 503, 549, 570, 571, 628, 705, 706, 713
  ],
  paldea: [
    // Paldean form Pokémon IDs
    128, 194, 195, 198, 199, 208, 211, 215, 916, 917, 918, 919, 920, 921
  ]
};

function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentGen, setCurrentGen] = useState('1');
  const [currentSpecialForm, setCurrentSpecialForm] = useState('normal');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPokemonByGeneration = async () => {
      setLoading(true);
      try {
        let pokemonToFetch = [];
        
        if (currentGen === 'all') {
          // Fetch all Pokémon from generation 1 to 9
          pokemonToFetch = Array.from(
            { length: GENERATIONS[9].end }, 
            (_, index) => index + 1
          );
        } else {
          const { start, end } = GENERATIONS[currentGen];
          pokemonToFetch = Array.from(
            { length: end - start + 1 }, 
            (_, index) => start + index
          );
        }

        const pokemonData = await Promise.all(
          pokemonToFetch.map(async (id) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return response.json();
          })
        );
        setPokemon(pokemonData);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
      setLoading(false);
    };

    fetchPokemonByGeneration();
  }, [currentGen]);

  const filteredPokemon = pokemon.filter(p => {
    // Apply search filter
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply special form filter
    if (currentSpecialForm === 'normal') {
      // For normal form, exclude Pokémon that are in any special form list
      const isInSpecialForms = Object.values(SPECIAL_FORMS).some(
        formIds => formIds.includes(p.id)
      );
      return matchesSearch && !isInSpecialForms;
    } else {
      // For special forms, only include Pokémon that are in the selected form list
      return matchesSearch && SPECIAL_FORMS[currentSpecialForm]?.includes(p.id);
    }
  });

  return (
    <div className="home">
      <div className="home-header">
        <GenerationFilter 
          currentGen={currentGen} 
          onGenChange={setCurrentGen}
          currentSpecialForm={currentSpecialForm}
          onSpecialFormChange={setCurrentSpecialForm}
        />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
      
      {loading ? (
        <div className="loading">Loading Pokémon...</div>
      ) : (
        <div className="pokemon-grid">
          {filteredPokemon.map(pokemon => (
            <PokemonCard 
              key={pokemon.id} 
              pokemon={pokemon}
              formType={currentSpecialForm}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home; 