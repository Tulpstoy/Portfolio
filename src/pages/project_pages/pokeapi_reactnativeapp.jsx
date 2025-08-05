import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import '../project_pages/project_reset.css';

import projectData from '../../data/ProjectCards.json';

// Section 1 - Onboarding Images
import onboarding1 from '../../assets/project5/section1-onboarding1.png';
import onboarding2 from '../../assets/project5/section1-onboarding2.png';
import onboarding3 from '../../assets/project5/section1-onboarding3.png';

// Section 2 - App Features Images
import app1 from '../../assets/project5/section2-app1.png';
import app2 from '../../assets/project5/section2-app2.png';
import app3 from '../../assets/project5/section2-app3.png';
import app4 from '../../assets/project5/section2-app4.png';
import app5 from '../../assets/project5/section2-app5.png';

// Section 3 - Debugging Images
import debugging1 from '../../assets/project5/section3-debugging1.png';
import debugging2 from '../../assets/project5/section3-debugging2.png';
import debugging3 from '../../assets/project5/section3-debugging3.png';

import ProjectHeader from '../../components/ProjectComponents/ProjectHeader';
import FeatureCard from '../../components/ProjectComponents/FeatureCard';
import CodeSnippet from '../../components/ProjectComponents/CodeSnippet';
import ProjectImageCarousel from '../../components/ProjectComponents/ProjectImageCarousel';
import MobileCarousel from '../../components/ProjectComponents/MobileCarousel';
import ConnectSection from '../../components/ProjectComponents/ConnectSection';

const PokeAPIReactNativeAppPage = () => {
  const project = {
    ...projectData.projects.find(p => p.id === 5),
    plainTitle: "PokeAPI React Native App",
    emojis: "📱",
    category: "React Native Mobile Development"
  };

  // Section 1 - Onboarding
  const onboardingImages = [onboarding1, onboarding2, onboarding3];
  const onboardingDescriptions = [
    "Welcome screen introducing the Pokemon app experience",
    "Onboarding tutorial showing app navigation and features",
    "Final onboarding screen with app permissions and setup"
  ];

  // Section 2 - App Features
  const appFeatureImages = [app1, app2, app3, app4, app5];
  const appFeatureDescriptions = [
    "Main app screen showing Pokemon list sorted by generation with search functionality",
    "Detailed Pokemon information page with stats and abilities",
    "Pokemon details with toggleable favourites and add to team buttons",
    "Teams menu showing user's created Pokemon teams",
    "Favourites menu displaying saved Pokemon"
  ];

  // Section 3 - Debugging
  const debuggingImages = [debugging1, debugging2, debugging3];
  const debuggingDescriptions = [
    "Debug menu showing app state and performance metrics",
    "Error logging and crash reporting interface",
    "Network request monitoring and API call debugging"
  ];

  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleCode = (id) => {
    setActiveSection(prev => prev === `code-${id}` ? null : `code-${id}`);
  };

  // Code snippets for Section 1 - Onboarding
  const onboardingCode1 = `// Onboarding Welcome Screen
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

const OnboardingWelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/img/pokeball.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to PokéTrainer!</Text>
          <Text style={styles.subtitle}>
            Your ultimate companion for exploring the world of Pokémon
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('OnboardingFeatures')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};`;

  const onboardingCode2 = `// Onboarding Welcome Screen Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  imageContainer: {
    marginBottom: 40,
  },
  image: {
    width: 150,
    height: 150,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});`;

  // Code snippets for Section 2 - App Features
  const appFeaturesCode1 = `// Home Screen - Pokemon List & Search
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PokemonCard from '../components/PokemonCard';
import GenerationFilter from '../components/GenerationFilter';
import {
  fetchPokemonList,
  fetchPokemonDetailsByList,
  searchPokemon
} from '../services/PokeAPIService';
import { getFavorites, addToFavorites, removeFromFavorites } from '../services/PokemonStorageService';

const PAGE_SIZE = 20;

const HomeScreen = ({ navigation }) => {
  const [masterPokemonList, setMasterPokemonList] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentGen, setCurrentGen] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteIds, setFavoriteIds] = useState(new Set());

  // Load generation data
  useEffect(() => {
    const loadGenerationData = async () => {
      setIsLoading(true);
      setDisplayedPokemon([]);

      try {
        const list = await fetchPokemonList(currentGen);
        setMasterPokemonList(list);

        if (list.length > 0) {
          const firstPageList = list.slice(0, PAGE_SIZE);
          const details = await fetchPokemonDetailsByList(firstPageList);
          setDisplayedPokemon(details);
        }
      } catch (error) {
        console.error("Failed to load generation data:", error);
        Alert.alert('Error', 'Failed to load Pokémon data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    loadGenerationData();
  }, [currentGen]);`;

  const appFeaturesCode2 = `// Pokemon Detail Screen - Favorites & Team Management
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { getFavorites, addToFavorites, removeFromFavorites, getTeam, addToTeam, removeFromTeam } from '../services/PokemonStorageService';

const PokemonDetailScreen = ({ route, navigation }) => {
  const { pokemon } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInTeam, setIsInTeam] = useState(false);
  const [teamCount, setTeamCount] = useState(0);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const favorites = await getFavorites();
      const team = await getTeam();
      setIsFavorite(favorites.some(fav => fav.id === pokemon.id));
      setIsInTeam(team.some(member => member.id === pokemon.id));
      setTeamCount(team.length);
    } catch (error) {
      console.error('Error checking status:', error);
    }
  };

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites(pokemon.id);
        setIsFavorite(false);
      } else {
        await addToFavorites(pokemon);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleTeamToggle = async () => {
    try {
      if (isInTeam) {
        await removeFromTeam(pokemon.id);
        setIsInTeam(false);
        setTeamCount(prev => prev - 1);
      } else {
        if (teamCount >= 6) {
          Alert.alert('Team Full', 'Your team can only have 6 Pokémon. Please remove one to add a new member.');
          return;
        }
        await addToTeam(pokemon);
        setIsInTeam(true);
        setTeamCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error toggling team:', error);
    }
  };`;

  // Code snippets for Section 3 - API Service
  const debuggingCode1 = `// PokeAPI Service - Efficient Data Fetching
// In-memory cache to store fetched Pokémon details and avoid re-fetching during the app session.
const pokemonCache = new Map();

/**
 * FETCH A LIST OF POKÉMON (LIGHTWEIGHT)
 * - Endpoint: GET https://pokeapi.co/api/v2/pokemon
 * - Parameters: limit, offset
 * This function is the efficient first step for loading a generation.
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
  const url = \`https://pokeapi.co/api/v2/pokemon?limit=\${endpoint.limit}&offset=\${endpoint.offset}\`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results.map(p => ({
      ...p,
      id: p.url.split('/')[6],
    }));
  } catch (error) {
    console.error(\`Failed to fetch Pokémon list for generation \${generation}:\`, error);
    return [];
  }
};`;

  const debuggingCode2 = `// Pokemon Card Component - Reusable UI
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const PokemonCard = ({ pokemon, onPress, isFavorite, onFavoriteToggle }) => {
  const getTypeColor = (type) => {
    const colors = {
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
      fairy: '#EE99AC',
    };
    return colors[type] || '#A8A878';
  };

  const formatId = (id) => {
    return \`#\${id.toString().padStart(3, '0')}\`;
  };

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <Text style={styles.pokemonId}>{formatId(pokemon.id)}</Text>
        <TouchableOpacity onPress={onFavoriteToggle} style={styles.favoriteButton}>
          <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: pokemon.sprites?.front_default }}
          style={styles.pokemonImage}
          resizeMode="contain"
        />
      </View>
      
      <Text style={styles.pokemonName}>{capitalizeFirst(pokemon.name)}</Text>
      
      <View style={styles.typesContainer}>
        {pokemon.types?.slice(0, 2).map((typeInfo, index) => (
          <View
            key={index}
            style={[
              styles.typeBadge,
              { backgroundColor: getTypeColor(typeInfo.type.name) }
            ]}
          >
            <Text style={styles.typeText}>
              {capitalizeFirst(typeInfo.type.name)}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};`;

  return (
    <>
      <Helmet>
        <title>PokeAPI React Native App - Micah Bron Portfolio</title>
        <meta name="description" content="A React Native mobile app that integrates with the PokeAPI to provide a comprehensive Pokemon experience with search, favorites, team building, and debugging features." />
        <meta name="keywords" content="React Native, PokeAPI, mobile development, Pokemon, JavaScript, TypeScript, mobile app, iOS, Android, API integration" />
        <meta property="og:title" content="PokeAPI React Native App - Micah Bron Portfolio" />
        <meta property="og:description" content="A React Native mobile app that integrates with the PokeAPI to provide a comprehensive Pokemon experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://micahbron.com/projects/5" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PokeAPI React Native App - Micah Bron Portfolio" />
        <meta name="twitter:description" content="A React Native mobile app that integrates with the PokeAPI to provide a comprehensive Pokemon experience." />
      </Helmet>
      <div className="project-page">
        <ProjectHeader
          title={project.plainTitle}
          emojis={project.emojis}
          category={project.category}
          tags={[
            "React Native",
            "JavaScript",
            "TypeScript",
            "PokeAPI",
            "Mobile Development",
            "iOS",
            "Android",
            "API Integration",
            "State Management",
            "Navigation",
            "AsyncStorage",
            "Debug Tools"
          ]}
          githubLink="https://github.com/Tulpstoy/PokeAPI-ReactNative"
        />

        <h2>Project Overview</h2>
        <div className="project-description">
          <p>
            A comprehensive React Native mobile application that integrates with the PokeAPI to provide
            users with a complete Pokemon experience. The app features an intuitive onboarding process,
            powerful search and filtering capabilities, detailed Pokemon information, team building tools,
            favorites management, and comprehensive debugging features for development and testing.
          </p>
        </div>

        {/* Section 1: Onboarding Experience */}
        <div className="section">
          <div className="features-section">
            <h2>Onboarding Experience</h2>
            <div className="features-grid">
              <FeatureCard
                title="Welcome to PokéTrainer"
                content="Created a welcoming first screen with Pokéball imagery and clear messaging about the app's purpose. Features smooth navigation to the features overview screen with engaging visual design."
                emoji="👋"
              />
              <FeatureCard
                title="Feature Discovery"
                content="Implemented an interactive features screen that showcases the app's core capabilities including Pokémon browsing, favorites system, team building, and detailed stats viewing."
                emoji="🔍"
              />
            </div>
          </div>

          <div className="mockup-section">
            <MobileCarousel
              images={onboardingImages}
              descriptions={onboardingDescriptions}
            />
          </div>

          <section className="code-snippets-section">
            <div className="code-sections">
              <CodeSnippet
                title="Onboarding Screen Component"
                id="onboarding1"
                code={onboardingCode1}
                language="javascript"
                activeSection={activeSection}
                toggle={toggleCode}
              />
              <CodeSnippet
                title="Onboarding Styles"
                id="onboarding2"
                code={onboardingCode2}
                language="javascript"
                activeSection={activeSection}
                toggle={toggleCode}
              />
            </div>
          </section>
        </div>

        {/* Section 2: App Features */}
        <div className="section">
          <div className="features-section">
            <h2>Core App Features</h2>
            <div className="features-grid">
              <FeatureCard
                title="Generation-Based Browsing"
                content="Implemented efficient generation filtering with pagination (20 Pokémon per page) and real-time search functionality. Features smooth loading states and error handling for optimal user experience."
                emoji="🎮"
              />
              <FeatureCard
                title="Pokémon Detail & Stats"
                content="Created comprehensive detail screens with type-based color coding, stat visualization, and dual functionality for favorites and team management with 6-Pokémon team limits."
                emoji="📊"
              />
              <FeatureCard
                title="Favorites & Team System"
                content="Built persistent storage for favorites and team management using AsyncStorage. Features real-time status checking, team size validation, and seamless toggle functionality."
                emoji="❤️"
              />
            </div>
          </div>

          <div className="mockup-section">
            <MobileCarousel
              images={appFeatureImages}
              descriptions={appFeatureDescriptions}
            />
          </div>

          <section className="code-snippets-section">
            <div className="code-sections">
              <CodeSnippet
                title="Pokemon List Component"
                id="appFeatures1"
                code={appFeaturesCode1}
                language="javascript"
                activeSection={activeSection}
                toggle={toggleCode}
              />
              <CodeSnippet
                title="Pokemon Detail Component"
                id="appFeatures2"
                code={appFeaturesCode2}
                language="javascript"
                activeSection={activeSection}
                toggle={toggleCode}
              />
            </div>
          </section>
        </div>

        {/* Section 3: API & Components */}
        <div className="section">
          <div className="features-section">
            <h2>API Integration & Components</h2>
            <div className="features-grid">
              <FeatureCard
                title="Efficient PokeAPI Integration"
                content="Built optimized API service with in-memory caching, concurrent data fetching, and generation-based endpoints. Features intelligent error handling and performance monitoring."
                emoji="⚡"
              />
              <FeatureCard
                title="Reusable UI Components"
                content="Created modular PokemonCard component with type-based color coding, favorite toggles, and responsive design. Features consistent styling and smooth animations."
                emoji="🎨"
              />
            </div>
          </div>

          <div className="mockup-section">
            <MobileCarousel
              images={debuggingImages}
              descriptions={debuggingDescriptions}
            />
          </div>

          <section className="code-snippets-section">
            <div className="code-sections">
              <CodeSnippet
                title="Debug Menu Component"
                id="debugging1"
                code={debuggingCode1}
                language="javascript"
                activeSection={activeSection}
                toggle={toggleCode}
              />
              <CodeSnippet
                title="Debug Styles and Network Monitoring"
                id="debugging2"
                code={debuggingCode2}
                language="javascript"
                activeSection={activeSection}
                toggle={toggleCode}
              />
            </div>
          </section>
        </div>

        <ConnectSection />
      </div>
    </>
  );
};

export default PokeAPIReactNativeAppPage; 