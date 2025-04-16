import { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import '../styles/Favorites.css';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites = JSON.parse(localStorage.getItem('pokemon_favorites') || '[]');
      setFavorites(savedFavorites);
    };

    loadFavorites();
    // Add event listener for storage changes
    window.addEventListener('storage', loadFavorites);
    
    return () => {
      window.removeEventListener('storage', loadFavorites);
    };
  }, []);

  const removeFavorite = (pokemonId) => {
    const newFavorites = favorites.filter(pokemon => pokemon.id !== pokemonId);
    localStorage.setItem('pokemon_favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  return (
    <div className="favorites-page">
      <h1>Your Favorite Pokémon</h1>
      
      {favorites.length === 0 ? (
        <div className="no-favorites">
          <p>You haven't added any Pokémon to your favorites yet.</p>
          <p>Go back to the home page and click the star icon to add some!</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(pokemon => (
            <div key={pokemon.id} className="favorite-item">
              <PokemonCard pokemon={pokemon} />
              <button
                className="remove-button"
                onClick={() => removeFavorite(pokemon.id)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites; 