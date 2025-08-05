import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/Detail.css';

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
  normal: { label: 'Normal Form', icon: '🔵' },
  mega: { label: 'Mega Evolution', icon: '⭐' },
  gmax: { label: 'Gigantamax', icon: '☁️' },
  alola: { label: 'Alolan Form', icon: '🌺' },
  galar: { label: 'Galarian Form', icon: '⚔️' },
  hisui: { label: 'Hisuian Form', icon: '🎌' },
  paldea: { label: 'Paldean Form', icon: '🌟' }
};

// Import SPECIAL_FORMS from Home.jsx or create a shared constants file
const SPECIAL_FORMS = {
  mega: [3, 6, 9, 15, 18, 65, 80, 94, 115, 127, 130, 142, 150, 181, 212, 214, 229, 248, 
    257, 282, 303, 306, 308, 310, 354, 359, 380, 381, 445, 448, 460],
  gmax: [3, 6, 9, 12, 25, 52, 68, 94, 99, 131, 133, 143, 569, 809, 812, 815, 818, 823, 
    826, 834, 839, 841, 842, 844, 849, 851, 858, 861, 869, 879, 884, 892],
  alola: [19, 20, 26, 27, 28, 37, 38, 50, 51, 52, 53, 74, 75, 76, 88, 89, 103, 105],
  galar: [52, 77, 78, 83, 110, 122, 222, 263, 264, 554, 555, 562, 618],
  hisui: [58, 59, 100, 101, 157, 503, 549, 570, 571, 628, 705, 706, 713],
  paldea: [128, 194, 195, 198, 199, 208, 211, 215, 916, 917, 918, 919, 920, 921]
};

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokemon, setPokemon] = useState(null);
  const [basePokemon, setBasePokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [availableForms, setAvailableForms] = useState(['normal']);
  const [currentForm, setCurrentForm] = useState(searchParams.get('form') || 'normal');

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        // Always fetch the base Pokemon first
        const baseResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const baseData = await baseResponse.json();
        setBasePokemon(baseData);

        // Fetch the form variant if needed
        if (currentForm !== 'normal' && currentForm !== 'mega' && currentForm !== 'gmax') {
          try {
            const formResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${baseData.name}-${currentForm}`);
            const formData = await formResponse.json();
            setPokemon({
              ...formData,
              baseId: baseData.id
            });
          } catch (error) {
            console.error('Error fetching form variant:', error);
            setPokemon(baseData); // Fallback to base Pokemon if form fetch fails
          }
        } else {
          setPokemon(baseData);
        }

        // Check if pokemon is in favorites
        const favorites = JSON.parse(localStorage.getItem('pokemon_favorites') || '[]');
        setIsFavorite(favorites.some(fav => fav.id === Number(id)));

        // Determine available forms
        const forms = ['normal'];
        Object.entries(SPECIAL_FORMS).forEach(([form, ids]) => {
          if (ids.includes(Number(id))) {
            forms.push(form);
          }
        });
        setAvailableForms(forms);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
      setLoading(false);
    };

    fetchPokemon();
  }, [id, currentForm]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('pokemon_favorites') || '[]');
    
    if (isFavorite) {
      const newFavorites = favorites.filter(fav => fav.id !== Number(id));
      localStorage.setItem('pokemon_favorites', JSON.stringify(newFavorites));
    } else {
      const newFavorites = [...favorites, {
        id: Number(id),
        name: basePokemon.name, // Use base Pokemon name
        types: pokemon.types,
        sprites: {
          front_default: pokemon.sprites.front_default,
          other: pokemon.sprites.other
        },
        height: pokemon.height,
        weight: pokemon.weight,
        formType: currentForm
      }];
      localStorage.setItem('pokemon_favorites', JSON.stringify(newFavorites));
    }
    
    setIsFavorite(!isFavorite);
  };

  const handleFormChange = (form) => {
    setCurrentForm(form);
    setSearchParams({ form });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!pokemon) {
    return <div className="error">Pokemon not found</div>;
  }

  const mainType = pokemon.types[0].type.name;
  const secondaryType = pokemon.types[1]?.type.name;
  const mainTypeColor = TYPE_COLORS[mainType];
  const secondaryTypeColor = secondaryType ? TYPE_COLORS[secondaryType] : mainTypeColor;

  return (
    <div className="detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      
      <div className="detail-card" style={{ 
        background: `linear-gradient(135deg, ${mainTypeColor}22 0%, white 100%)`
      }}>
        <div className="detail-header">
          <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
          <button
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
            style={{ 
              backgroundColor: isFavorite ? mainTypeColor : '#f0f0f0',
              color: isFavorite ? 'white' : '#666'
            }}
            onClick={toggleFavorite}
          >
            {isFavorite ? '★ Remove from Team' : '☆ Add to Team'}
          </button>
        </div>

        {availableForms.length > 1 && (
          <div className="form-switcher">
            {availableForms.map(form => (
              <button
                key={form}
                className={`form-button ${currentForm === form ? 'active' : ''}`}
                onClick={() => handleFormChange(form)}
                style={{
                  backgroundColor: currentForm === form ? mainTypeColor : '#f0f0f0',
                  color: currentForm === form ? 'white' : '#666'
                }}
              >
                <span className="form-icon">{FORM_NAMES[form].icon}</span>
                <span className="form-label">{FORM_NAMES[form].label}</span>
              </button>
            ))}
          </div>
        )}

        <div className="detail-content">
          <div className="pokemon-variants">
            <div className="variant-container">
              <h3>Normal</h3>
              <div className="detail-image">
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
              </div>
            </div>
            {pokemon.sprites.other['official-artwork'].front_shiny && (
              <div className="variant-container">
                <h3>✨ Shiny</h3>
                <div className="detail-image">
                  <img
                    src={pokemon.sprites.other['official-artwork'].front_shiny || pokemon.sprites.front_shiny}
                    alt={`Shiny ${pokemon.name}`}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="detail-info">
            <div className="info-section types-section">
              <h2>Types</h2>
              <div className="pokemon-types">
                {pokemon.types.map(({ type }) => (
                  <span 
                    key={type.name} 
                    className="type-badge"
                    style={{ backgroundColor: TYPE_COLORS[type.name] }}
                  >
                    {type.name.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            <div className="info-section">
              <h2>Stats</h2>
              <div className="stats-grid">
                {pokemon.stats.map(stat => (
                  <div key={stat.stat.name} className="stat-item">
                    <span className="stat-name">
                      {stat.stat.name.replace('-', ' ').toUpperCase()}
                    </span>
                    <div className="stat-bar-container">
                      <div
                        className="stat-bar"
                        style={{ 
                          width: `${(stat.base_stat / 255) * 100}%`,
                          backgroundColor: mainTypeColor,
                          boxShadow: `0 2px 8px ${mainTypeColor}66`
                        }}
                      >
                        {stat.base_stat}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-section">
              <h2>Physical</h2>
              <div className="physical-stats">
                <div className="physical-stat">
                  <span>Height</span>
                  <strong style={{ color: mainTypeColor }}>{pokemon.height / 10}m</strong>
                </div>
                <div className="physical-stat">
                  <span>Weight</span>
                  <strong style={{ color: secondaryTypeColor }}>{pokemon.weight / 10}kg</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail; 