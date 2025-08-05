import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaPlus } from 'react-icons/fa';
import './Project3Page.css';
import projectData from '../../data/ProjectCards.json';
import poke1 from './poke1.png';
import poke2 from './poke2.png';

const Project3Page = () => {
  const project = projectData.projects.find(p => p.id === 3);
  const [activeSection, setActiveSection] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const mockupImages = [poke1, poke2];
  const imageDescriptions = [
    "Main interface showing team builder with type analysis and Pokemon selection",
    "Detailed view of a Pokemon's stats, moves, and type matchups"
  ];

  // Add scroll to top effect at the beginning of the component
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mockupImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mockupImages.length) % mockupImages.length);
  };

  const apiIntegrationCode = `// Home.jsx - Dynamic Pokemon Fetching with Generation Filtering
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
        const response = await fetch(\`https://pokeapi.co/api/v2/pokemon/\${id}\`);
        return response.json();
      })
    );
    setPokemon(pokemonData);
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
  }
  setLoading(false);
};`;

  const teamAnalysisCode = `// Team.jsx - Advanced Type Coverage Analysis
const TYPE_CHART = {
  normal: { weakTo: ['fighting'], resistantTo: [], immuneTo: ['ghost'] },
  fire: { weakTo: ['water', 'ground', 'rock'], resistantTo: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'], immuneTo: [] },
  water: { weakTo: ['electric', 'grass'], resistantTo: ['fire', 'water', 'ice', 'steel'], immuneTo: [] },
  // ... other types ...
};

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

  // Calculate net vulnerabilities
  Object.keys(TYPE_CHART).forEach(type => {
    const weaknessCount = analysis.weaknesses[type] || 0;
    const resistanceCount = analysis.resistances[type] || 0;
    const immunityCount = analysis.immunities[type] || 0;

    if (immunityCount > 0) return;

    const netVulnerability = weaknessCount - resistanceCount;
    if (netVulnerability > 0) {
      analysis.totalVulnerabilities[type] = true;
    }
  });

  return analysis;
};`;

  const pokemonCardCode = `// PokemonCard.jsx - Dynamic Pokemon Card Component
const TYPE_COLORS = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  // ... other type colors ...
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
      if (formType !== 'normal') {
        try {
          const response = await fetch(\`https://pokeapi.co/api/v2/pokemon/\${pokemon.name}-\${formType}\`);
          const data = await response.json();
          setPokemonData({
            ...data,
            baseId: pokemon.id
          });
        } catch (error) {
          console.error('Error fetching special form:', error);
        }
      }
    };

    if (formType !== 'normal') {
      fetchSpecialForm();
    }
  }, [pokemon.id, formType]);

  return (
    <Link 
      to={\`/pokemon/\${pokemonData.baseId || pokemonData.id}?form=\${formType}\`} 
      className="pokemon-card" 
      style={{ backgroundColor: TYPE_COLORS[mainType] }}
    >
      <button
        className={\`card-favorite-button \${isFavorite ? 'active' : ''}\`}
        onClick={toggleFavorite}
        style={{ 
          backgroundColor: isFavorite ? TYPE_COLORS[mainType] : 'rgba(255, 255, 255, 0.9)',
          color: isFavorite ? 'white' : '#666'
        }}
      >
        {isFavorite ? '★' : '☆'}
      </button>
      {/* Card content */}
    </Link>
  );
}`;

  return (
    <div className="project-page">
      {/* Project Header */}
      <header className="project-header">
        <div className="project-title-section">
          <h1>
            <span className="gradient-text">{project.title}</span>
          </h1>
          <p className="project-category">{project.category}</p>
          <div className="project-tags">
            {project.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
          <div className="project-actions">
            <a href="https://poketeamtrainer.micahbron.com/" target="_blank" rel="noopener noreferrer" className="live-demo">
              <FaExternalLinkAlt /> Live Demo
            </a>
            <a href="https://github.com/Tulpstoy/PokeTrainerApp" target="_blank" rel="noopener noreferrer" className="github">
              <FaGithub /> View Code
            </a>
          </div>
        </div>
      </header>

      {/* Project Overview */}
      <section className="project-section">
        <h2>Project Overview</h2>
        <p>
          PokeTeamPlanner is a fast, responsive Pokédex and team planning app built for both casual fans and competitive Pokémon players. 
          Designed with performance and usability in mind, the app enables users to explore detailed Pokémon data, build personalized teams, 
          and analyze their type strengths and weaknesses. The final build is just 64 KB—making it lightweight without sacrificing features.
        </p>
        <p>
          This solo project was built in React and makes extensive use of the PokeAPI to dynamically fetch and render Pokémon data across multiple pages. 
          From lazy-loaded images to real-time type matchup calculations, every component was optimized to be both informative and efficient.
        </p>
      </section>

      {/* Features Grid */}
      <section className="project-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          {/* API Integration Feature */}
          <div className="feature-card">
            <div 
              className="feature-header"
              onClick={() => toggleSection('api')}
            >
              <div className="feature-title">
                <h3>Dynamic API Integration</h3>
                <button className="feature-toggle">
                  <FaPlus className={`plus-icon ${activeSection === 'api' ? 'is-active' : ''}`} />
                </button>
              </div>
            </div>
            <div className={`feature-content ${activeSection === 'api' ? 'is-expanded' : ''}`}>
              <p>
                This app makes strategic use of the PokeAPI to deliver real-time, paginated Pokémon data. 
                From generation filters to detailed stat charts, the app uses lazy loading and custom fetch logic 
                to ensure minimal calls and maximum performance.
              </p>
            </div>
          </div>

          {/* Team Analysis Feature */}
          <div className="feature-card">
            <div 
              className="feature-header"
              onClick={() => toggleSection('analysis')}
            >
              <div className="feature-title">
                <h3>Team Builder & Type Coverage</h3>
                <button className="feature-toggle">
                  <FaPlus className={`plus-icon ${activeSection === 'analysis' ? 'is-active' : ''}`} />
                </button>
              </div>
            </div>
            <div className={`feature-content ${activeSection === 'analysis' ? 'is-expanded' : ''}`}>
              <p>
                Users can build a personalized team by favouriting Pokémon. The team planner provides a dynamic breakdown 
                of type matchups, showing weaknesses, resistances, and immunities with intuitive color coding and tooltips for clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mockup Section */}
      <section className="mockup-section">
        <h2>Project Screenshots</h2>
        <div className="mockup-carousel">
          <button className="carousel-button prev" onClick={prevSlide}>
            <span className="arrow">←</span>
          </button>
          <div className="mockup-image">
            <img 
              src={mockupImages[currentSlide]} 
              alt={`Project screenshot ${currentSlide + 1}`}
            />
          </div>
          <button className="carousel-button next" onClick={nextSlide}>
            <span className="arrow">→</span>
          </button>
          <p className="image-description">{imageDescriptions[currentSlide]}</p>
          <div className="carousel-dots">
            {mockupImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Code Sections */}
      <section className="code-sections">
        <h2>Code Examples</h2>
        
        {/* API Integration Code */}
        <div className="code-section">
          <div 
            className="code-header"
            onClick={() => toggleSection('apiCode')}
          >
            <h4>Generation-Based Pokemon Fetching</h4>
            <button className="code-toggle">
              <FaPlus className={`plus-icon ${activeSection === 'apiCode' ? 'is-active' : ''}`} />
            </button>
          </div>
          <div className={`code-content ${activeSection === 'apiCode' ? 'is-expanded' : ''}`}>
            <pre><code>{apiIntegrationCode}</code></pre>
          </div>
        </div>

        {/* Team Analysis Code */}
        <div className="code-section">
          <div 
            className="code-header"
            onClick={() => toggleSection('analysisCode')}
          >
            <h4>Advanced Type Coverage Analysis</h4>
            <button className="code-toggle">
              <FaPlus className={`plus-icon ${activeSection === 'analysisCode' ? 'is-active' : ''}`} />
            </button>
          </div>
          <div className={`code-content ${activeSection === 'analysisCode' ? 'is-expanded' : ''}`}>
            <pre><code>{teamAnalysisCode}</code></pre>
          </div>
        </div>

        {/* Pokemon Card Component */}
        <div className="code-section">
          <div 
            className="code-header"
            onClick={() => toggleSection('cardCode')}
          >
            <h4>Dynamic Pokemon Card Component</h4>
            <button className="code-toggle">
              <FaPlus className={`plus-icon ${activeSection === 'cardCode' ? 'is-active' : ''}`} />
            </button>
          </div>
          <div className={`code-content ${activeSection === 'cardCode' ? 'is-expanded' : ''}`}>
            <pre><code>{pokemonCardCode}</code></pre>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="connect-section">
        <div className="connect-content">
          <h2>Connect With Me</h2>
          <p>Let's work together to bring your ideas to life.</p>
          <div className="email-container">
            <a 
              href="mailto:micah.bron@icloud.com" 
              className="email"
              aria-label="Send me an email"
            >
              micah.bron@icloud.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Project3Page; 