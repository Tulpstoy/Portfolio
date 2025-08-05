import { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import '../styles/Team.css';
import '../styles/TeamAnalysis.css';

const TYPE_CHART = {
  normal: { weakTo: ['fighting'], resistantTo: [], immuneTo: ['ghost'] },
  fire: { weakTo: ['water', 'ground', 'rock'], resistantTo: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'], immuneTo: [] },
  water: { weakTo: ['electric', 'grass'], resistantTo: ['fire', 'water', 'ice', 'steel'], immuneTo: [] },
  electric: { weakTo: ['ground'], resistantTo: ['electric', 'flying', 'steel'], immuneTo: [] },
  grass: { weakTo: ['fire', 'ice', 'poison', 'flying', 'bug'], resistantTo: ['water', 'electric', 'grass', 'ground'], immuneTo: [] },
  ice: { weakTo: ['fire', 'fighting', 'rock', 'steel'], resistantTo: ['ice'], immuneTo: [] },
  fighting: { weakTo: ['flying', 'psychic', 'fairy'], resistantTo: ['bug', 'rock', 'dark'], immuneTo: [] },
  poison: { weakTo: ['ground', 'psychic'], resistantTo: ['grass', 'fighting', 'poison', 'bug', 'fairy'], immuneTo: [] },
  ground: { weakTo: ['water', 'grass', 'ice'], resistantTo: ['poison', 'rock'], immuneTo: ['electric'] },
  flying: { weakTo: ['electric', 'ice', 'rock'], resistantTo: ['grass', 'fighting', 'bug'], immuneTo: ['ground'] },
  psychic: { weakTo: ['bug', 'ghost', 'dark'], resistantTo: ['fighting', 'psychic'], immuneTo: [] },
  bug: { weakTo: ['fire', 'flying', 'rock'], resistantTo: ['grass', 'fighting', 'ground'], immuneTo: [] },
  rock: { weakTo: ['water', 'grass', 'fighting', 'ground', 'steel'], resistantTo: ['normal', 'fire', 'poison', 'flying'], immuneTo: [] },
  ghost: { weakTo: ['ghost', 'dark'], resistantTo: ['poison', 'bug'], immuneTo: ['normal', 'fighting'] },
  dragon: { weakTo: ['ice', 'dragon', 'fairy'], resistantTo: ['fire', 'water', 'electric', 'grass'], immuneTo: [] },
  dark: { weakTo: ['fighting', 'bug', 'fairy'], resistantTo: ['ghost', 'dark'], immuneTo: ['psychic'] },
  steel: { weakTo: ['fire', 'fighting', 'ground'], resistantTo: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'], immuneTo: ['poison'] },
  fairy: { weakTo: ['poison', 'steel'], resistantTo: ['fighting', 'bug', 'dark'], immuneTo: ['dragon'] }
};

function Team() {
  const [favorites, setFavorites] = useState([]);
  const [teamAnalysis, setTeamAnalysis] = useState({
    weaknesses: {},
    resistances: {},
    immunities: {},
    totalVulnerabilities: {}
  });

  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites = JSON.parse(localStorage.getItem('pokemon_favorites') || '[]');
      setFavorites(savedFavorites);
      analyzeTeam(savedFavorites.slice(0, 6));
    };

    loadFavorites();
    window.addEventListener('storage', loadFavorites);
    
    return () => {
      window.removeEventListener('storage', loadFavorites);
    };
  }, []);

  const analyzeTeam = (team) => {
    const analysis = {
      weaknesses: {},
      resistances: {},
      immunities: {},
      totalVulnerabilities: {}
    };

    team.forEach(pokemon => {
      pokemon.types.forEach(({ type }) => {
        const typeData = TYPE_CHART[type.name];
        
        typeData.weakTo.forEach(weakness => {
          analysis.weaknesses[weakness] = (analysis.weaknesses[weakness] || 0) + 1;
        });
        
        typeData.resistantTo.forEach(resistance => {
          analysis.resistances[resistance] = (analysis.resistances[resistance] || 0) + 1;
        });
        
        typeData.immuneTo.forEach(immunity => {
          analysis.immunities[immunity] = (analysis.immunities[immunity] || 0) + 1;
        });
      });
    });

    Object.keys(TYPE_CHART).forEach(type => {
      const weaknessCount = analysis.weaknesses[type] || 0;
      const resistanceCount = analysis.resistances[type] || 0;
      const immunityCount = analysis.immunities[type] || 0;

      if (immunityCount > 0) {
        return;
      }

      const netVulnerability = weaknessCount - resistanceCount;
      
      if (netVulnerability > 0) {
        analysis.totalVulnerabilities[type] = true;
      }
    });

    setTeamAnalysis(analysis);
  };

  const removeFavorite = (pokemonId) => {
    const newFavorites = favorites.filter(pokemon => pokemon.id !== pokemonId);
    localStorage.setItem('pokemon_favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    analyzeTeam(newFavorites.slice(0, 6));
  };

  const activeTeam = favorites.slice(0, 6);
  const reservePokemon = favorites.slice(6);

  return (
    <div className="team-page">
      <h1>My Team</h1>
      
      <div className="team-analysis">
        <h2 className="analysis-header">Team Analysis</h2>
        <div className="analysis-sections">
          <div className="analysis-section weaknesses">
            <h3 className="section-title">Weaknesses</h3>
            <div className="type-list">
              {Object.entries(teamAnalysis.weaknesses)
                .sort(([,a], [,b]) => b - a)
                .map(([type, count]) => (
                  <span key={type} className={`type-item type-${type}`}>
                    {type.toUpperCase()}
                    <span className="effectiveness">{count}×</span>
                  </span>
                ))}
            </div>
          </div>
          <div className="analysis-section resistances">
            <h3 className="section-title">Resistances</h3>
            <div className="type-list">
              {Object.entries(teamAnalysis.resistances)
                .sort(([,a], [,b]) => b - a)
                .map(([type, count]) => (
                  <span key={type} className={`type-item type-${type}`}>
                    {type.toUpperCase()}
                    <span className="effectiveness">{count}×</span>
                  </span>
                ))}
            </div>
          </div>
          <div className="analysis-section immunities">
            <h3 className="section-title">Immunities</h3>
            <div className="type-list">
              {Object.entries(teamAnalysis.immunities)
                .sort(([,a], [,b]) => b - a)
                .map(([type, count]) => (
                  <span key={type} className={`type-item type-${type}`}>
                    {type.toUpperCase()}
                    <span className="effectiveness">{count}×</span>
                  </span>
                ))}
            </div>
          </div>
          <div className="analysis-section total-vulnerabilities">
            <h3 className="section-title">Uncovered Types</h3>
            <div className="type-list">
              {Object.keys(teamAnalysis.totalVulnerabilities)
                .sort()
                .map(type => (
                  <span key={type} className={`type-item type-${type}`}>
                    {type.toUpperCase()}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="active-team">
        <h2>Active Team ({activeTeam.length}/6)</h2>
        <div className="team-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="team-slot">
              {activeTeam[index] ? (
                <div className="team-member">
                  <PokemonCard pokemon={activeTeam[index]} />
                  <button
                    className="remove-button"
                    onClick={() => removeFavorite(activeTeam[index].id)}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="empty-slot">
                  <span>Empty Slot</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {reservePokemon.length > 0 && (
        <div className="reserve-pokemon">
          <h2>Reserve Pokémon</h2>
          <div className="pokemon-grid">
            {reservePokemon.map(pokemon => (
              <div key={pokemon.id} className="team-member">
                <PokemonCard pokemon={pokemon} />
                <button
                  className="remove-button"
                  onClick={() => removeFavorite(pokemon.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Team; 