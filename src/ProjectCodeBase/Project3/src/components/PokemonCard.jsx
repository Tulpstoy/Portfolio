import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/PokemonCard.css';

const TYPE_COLORS = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

const FORM_NAMES = {
  mega: 'Mega',
  gmax: 'Gigantamax',
  alola: 'Alolan',
  galar: 'Galarian',
  hisui: 'Hisuian',
  paldea: 'Paldean'
};

function PokemonCard({ pokemon, formType = 'normal' }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [pokemonData, setPokemonData] = useState(pokemon);
  const mainType = pokemonData.types[0].type.name;
  
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('pokemon_favorites') || '[]');
    setIsFavorite(favorites.some(fav => fav.id === pokemon.id));

    // Fetch special form data if needed
    const fetchSpecialForm = async () => {
      if (formType !== 'normal' && formType !== 'mega' && formType !== 'gmax') {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}-${formType}`);
          const data = await response.json();
          setPokemonData({
            ...data,
            baseId: pokemon.id // Store the original Pokemon ID
          });
        } catch (error) {
          console.error('Error fetching special form:', error);
        }
      }
    };

    if (formType !== 'normal') {
      fetchSpecialForm();
    } else {
      setPokemonData({
        ...pokemon,
        baseId: pokemon.id
      });
    }
  }, [pokemon.id, pokemon.name, formType]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    const favorites = JSON.parse(localStorage.getItem('pokemon_favorites') || '[]');
    
    if (isFavorite) {
      const newFavorites = favorites.filter(fav => fav.id !== pokemonData.baseId);
      localStorage.setItem('pokemon_favorites', JSON.stringify(newFavorites));
    } else {
      const newFavorites = [...favorites, {
        id: pokemonData.baseId,
        name: pokemonData.name,
        types: pokemonData.types,
        sprites: {
          front_default: pokemonData.sprites.front_default,
          other: pokemonData.sprites.other
        },
        height: pokemonData.height,
        weight: pokemonData.weight,
        formType: formType
      }];
      localStorage.setItem('pokemon_favorites', JSON.stringify(newFavorites));
    }
    
    setIsFavorite(!isFavorite);
  };

  const getFormattedName = () => {
    let name = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    if (formType !== 'normal') {
      name = `${FORM_NAMES[formType]} ${name.split('-')[0]}`;
    }
    return name;
  };

  return (
    <Link 
      to={`/pokemon/${pokemonData.baseId || pokemonData.id}?form=${formType}`} 
      className="pokemon-card" 
      style={{ backgroundColor: TYPE_COLORS[mainType] }}
    >
      <button
        className={`card-favorite-button ${isFavorite ? 'active' : ''}`}
        onClick={toggleFavorite}
        style={{ 
          backgroundColor: isFavorite ? TYPE_COLORS[mainType] : 'rgba(255, 255, 255, 0.9)',
          color: isFavorite ? 'white' : '#666'
        }}
      >
        {isFavorite ? '★' : '☆'}
      </button>
      <div className="pokemon-card-content">
        <img 
          src={pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default}
          alt={pokemonData.name}
          className="pokemon-image"
        />
        <h2 className="pokemon-name">{getFormattedName()}</h2>
        <div className="pokemon-types">
          {pokemonData.types.map(({ type }) => (
            <span 
              key={type.name}
              className="type-badge"
              style={{ backgroundColor: TYPE_COLORS[type.name] }}
            >
              {type.name.toUpperCase()}
            </span>
          ))}
        </div>
        <div className="pokemon-stats">
          <div className="stat">
            <span className="stat-label">Height</span>
            <span className="stat-value">{pokemonData.height / 10}m</span>
          </div>
          <div className="stat">
            <span className="stat-label">Weight</span>
            <span className="stat-value">{pokemonData.weight / 10}kg</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string.isRequired
        }).isRequired
      })
    ).isRequired,
    sprites: PropTypes.object.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired
  }).isRequired,
  formType: PropTypes.oneOf(['normal', 'mega', 'gmax', 'alola', 'galar', 'hisui', 'paldea'])
};

export default PokemonCard; 