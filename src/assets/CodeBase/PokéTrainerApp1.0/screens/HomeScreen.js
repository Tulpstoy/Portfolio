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
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [allPokemonLoaded, setAllPokemonLoaded] = useState(false);
  const [page, setPage] = useState(0);
  const [currentGen, setCurrentGen] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());

  // Load generation data
  useEffect(() => {
    const loadGenerationData = async () => {
      setIsLoading(true);
      setDisplayedPokemon([]);
      setAllPokemonLoaded(false);

      try {
        const list = await fetchPokemonList(currentGen);
        setMasterPokemonList(list);

        if (list.length > 0) {
          const firstPageList = list.slice(0, PAGE_SIZE);
          const details = await fetchPokemonDetailsByList(firstPageList);
          setDisplayedPokemon(details);
          setPage(1);
        } else {
          setAllPokemonLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load generation data:", error);
        Alert.alert('Error', 'Failed to load Pokémon data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    loadGenerationData();
  }, [currentGen]);

  // Load more Pokémon
  const loadMorePokemon = useCallback(async () => {
    if (isFetchingMore || allPokemonLoaded) return;
    
    const currentOffset = page * PAGE_SIZE;
    if (currentOffset >= masterPokemonList.length) {
      setAllPokemonLoaded(true);
      return;
    }

    setIsFetchingMore(true);
    try {
      const nextPageList = masterPokemonList.slice(currentOffset, currentOffset + PAGE_SIZE);
      const details = await fetchPokemonDetailsByList(nextPageList);
      setDisplayedPokemon(prev => [...prev, ...details]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error("Failed to load more pokemon:", error);
    } finally {
      setIsFetchingMore(false);
    }
  }, [page, isFetchingMore, allPokemonLoaded, masterPokemonList]);
  
  // Load favorites
  const loadFavoriteIds = async () => {
    const favs = await getFavorites();
    setFavoriteIds(new Set(favs.map(f => f.id)));
  };

  useFocusEffect(useCallback(() => { loadFavoriteIds(); }, []));

  const handleFavoriteToggle = async (p) => {
    const isFav = favoriteIds.has(p.id);
    if (isFav) {
      await removeFromFavorites(p.id);
    } else {
      await addToFavorites(p);
    }
    loadFavoriteIds();
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const results = await searchPokemon(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectPokemon = (p) => {
    navigation.navigate('PokemonDetail', { pokemon: p, pokemonName: p.name });
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <PokemonCard
        pokemon={item}
        onPress={() => handleSelectPokemon(item)}
        isFavorite={favoriteIds.has(item.id)}
        onFavoriteToggle={() => handleFavoriteToggle(item)}
      />
    </View>
  );

  const renderFooter = () => {
    if (searchQuery.length > 0) return null;
    if (isFetchingMore) return <ActivityIndicator style={{ marginVertical: 20 }} size="large" color="#ff6b6b" />;
    if (allPokemonLoaded) return <Text style={styles.footerText}>All Pokémon loaded!</Text>;
    
    return (
      <TouchableOpacity style={styles.loadMoreButton} onPress={loadMorePokemon}>
        <Text style={styles.loadMoreButtonText}>Load More</Text>
      </TouchableOpacity>
    );
  };

  const displayData = searchQuery.length > 2 ? searchResults : displayedPokemon;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#ff6b6b" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>PokéTrainer</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Pokémon..."
        placeholderTextColor="#666"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <GenerationFilter
        selectedGeneration={currentGen}
        onSelectGeneration={setCurrentGen}
        onSelectSpecialForm={() => {}}
        selectedSpecialForm={'normal'}
      />
      <FlatList
        data={displayData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        onEndReached={loadMorePokemon}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 20,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  cardWrapper: {
    flex: 1,
    margin: 5,
  },
  footerText: {
    textAlign: 'center',
    color: '#ffffff',
    marginVertical: 20,
    fontSize: 16,
  },
  loadMoreButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 20,
  },
  loadMoreButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;