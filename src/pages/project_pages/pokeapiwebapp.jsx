import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import '../project_pages/project_reset.css';
import './pokeapiwebapp.css';

import projectData from '../../data/ProjectCards.json';

import page1 from '../../assets/project3/page1.png';
import page2 from '../../assets/project3/page2.png';
import page3 from '../../assets/project3/page3.png';
import page4 from '../../assets/project3/page4.png';
import page5 from '../../assets/project3/page5.png';
import cardimage from '../../assets/project3/cardimage.png';

import ProjectHeader from '../../components/ProjectComponents/ProjectHeader';
import FeatureCard from '../../components/ProjectComponents/FeatureCard';
import CodeSnippet from '../../components/ProjectComponents/CodeSnippet';
import ProjectImageCarousel from '../../components/ProjectComponents/ProjectImageCarousel';
import ConnectSection from '../../components/ProjectComponents/ConnectSection';

const PokeAPIWebApp = () => {
  const project = {
    ...projectData.projects.find(p => p.id === 3),
    plainTitle: "PokeTeamPlanner",
    emojis: "⚡",
    category: "React Web Application"
  };

  const mockupImages = [page1, page2, page3, page4, page5];
  const imageDescriptions = [
    "Main interface showing the Pokemon search and filtering functionality",
    "Functionality to show only regional variants/forms of a Pokemon",
    "Functionality to sort by generation that Pokemon was released in",
    "Active Team View/Builder with some details on the Pokemon",
    "Team Analysis Page with a breakdown of the team's type strengths and weaknesses, immunities, and uncovered types"
  ];

  // Debug logging
  console.log('Mockup Images:', mockupImages);
  console.log('Image Descriptions:', imageDescriptions);

  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFeature = (id) => {
    setActiveSection(prev => prev === `feature-${id}` ? null : `feature-${id}`);
  };

  const toggleCode = (id) => {
    setActiveSection(prev => prev === `code-${id}` ? null : `code-${id}`);
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
    <>
      <Helmet>
        <title>PokeTeamPlanner - Micah Bron Portfolio</title>
        <meta name="description" content="A fast, responsive Pokédex and team planning app built for both casual fans and competitive Pokémon players. Features dynamic API integration, team building, and type coverage analysis." />
        <meta name="keywords" content="PokeTeamPlanner, Pokemon, PokeAPI, React, JavaScript, team builder, type coverage, Pokedex, web application, API integration" />
        <meta property="og:title" content="PokeTeamPlanner - Micah Bron Portfolio" />
        <meta property="og:description" content="A fast, responsive Pokédex and team planning app built for both casual fans and competitive Pokémon players." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://micahbron.com/projects/3" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PokeTeamPlanner - Micah Bron Portfolio" />
        <meta name="twitter:description" content="A fast, responsive Pokédex and team planning app built for both casual fans and competitive Pokémon players." />
      </Helmet>
      <div className="project-page">
        <ProjectHeader
          title={project.plainTitle}
          emojis={project.emojis}
          category={project.category}
          tags={[
            "React",
            "JavaScript",
            "CSS3",
            "HTML5",
            "API Integration",
            "PokeAPI",
            "TypeScript",
            "Responsive Design",
            "State Management",
            "Component Architecture",
            "Data Fetching",
            "Type Coverage Analysis"
          ]}
          liveLink="https://poketeamtrainer.micahbron.com/"
          githubLink="https://github.com/Tulpstoy/PokeTrainerApp"
        />

        <h2>Project Overview</h2>
        <div className="project-description">
          <p>
            PokeTeamPlanner is a fast, responsive Pokédex and team planning app built for both casual fans and competitive Pokémon players. 
            Designed with performance and usability in mind, the app enables users to explore detailed Pokémon data, build personalized teams, 
            and analyze their type strengths and weaknesses. The final build is just 64 KB—making it lightweight without sacrificing features.
          </p>
          <p>
            This solo project was built in React and makes extensive use of the PokeAPI to dynamically fetch and render Pokémon data across multiple pages. 
            From lazy-loaded images to real-time type matchup calculations, every component was optimized to be both informative and efficient.
          </p>
        </div>

        <div className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <FeatureCard
              title="Dynamic API Integration"
              content="This app makes strategic use of the PokeAPI to deliver real-time, paginated Pokémon data. From generation filters to detailed stat charts, the app uses lazy loading and custom fetch logic to ensure minimal calls and maximum performance."
              emoji="🔌"
            />
            <FeatureCard
              title="Team Builder & Type Coverage"
              content="Users can build a personalized team by favouriting Pokémon. The team planner provides a dynamic breakdown of type matchups, showing weaknesses, resistances, and immunities with intuitive color coding and tooltips for clarity."
              emoji="⚔️"
            />
          </div>
        </div>

        <h2>Project Screenshots</h2>
        <div className="mockup-section">
          <ProjectImageCarousel
            images={mockupImages}
            descriptions={imageDescriptions}
          />
        </div>

        <h2>Code Examples</h2>
        <section className="code-snippets-section">
          <div className="code-sections">
            <CodeSnippet
              title="Generation-Based Pokemon Fetching"
              id="apiIntegration"
              code={apiIntegrationCode}
              language="javascript"
              activeSection={activeSection}
              toggle={toggleCode}
            />
            <CodeSnippet
              title="Advanced Type Coverage Analysis"
              id="teamAnalysis"
              code={teamAnalysisCode}
              language="javascript"
              activeSection={activeSection}
              toggle={toggleCode}
            />
            <CodeSnippet
              title="Dynamic Pokemon Card Component"
              id="pokemonCard"
              code={pokemonCardCode}
              language="javascript"
              activeSection={activeSection}
              toggle={toggleCode}
            />
          </div>
        </section>

        <ConnectSection />
      </div>
    </>
  );
};

export default PokeAPIWebApp; 