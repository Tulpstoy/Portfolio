import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PokemonCard from '../components/PokemonCard';
import { getFavorites, removeFromFavorites } from '../services/PokemonStorageService';
import { fetchFullPokemonDetails } from '../services/PokeAPIService';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavorites = async () => {
    setIsLoading(true);
    try {
      const favoriteIds = await getFavorites();
      const favoriteDetails = await Promise.all(
        favoriteIds.map(fav => fetchFullPokemonDetails(fav.id))
      );
      setFavorites(favoriteDetails.filter(pokemon => pokemon !== null));
    } catch (error) {
      console.error('Error loading favorites:', error);
      Alert.alert('Error', 'Failed to load favorites. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(useCallback(() => {
    loadFavorites();
  }, []));

  const handleFavoriteToggle = async (pokemon) => {
    try {
      await removeFromFavorites(pokemon.id);
      setFavorites(prev => prev.filter(fav => fav.id !== pokemon.id));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const handleSelectPokemon = (pokemon) => {
    navigation.navigate('PokemonDetail', { pokemon, pokemonName: pokemon.name });
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <PokemonCard
        pokemon={item}
        onPress={() => handleSelectPokemon(item)}
        isFavorite={true}
        onFavoriteToggle={() => handleFavoriteToggle(item)}
      />
    </View>
  );

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
      <Text style={styles.title}>Favorites</Text>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet!</Text>
          <Text style={styles.emptySubtext}>Add Pokémon to your favorites from the Home screen.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
  listContainer: {
    paddingHorizontal: 10,
  },
  cardWrapper: {
    flex: 1,
    margin: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default FavoritesScreen; 