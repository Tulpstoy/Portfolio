import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PokemonCard from '../components/PokemonCard';
import { getTeam, removeFromTeam } from '../services/PokemonStorageService';
import { fetchFullPokemonDetails } from '../services/PokeAPIService';

const TeamScreen = ({ navigation }) => {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTeam = async () => {
    setIsLoading(true);
    try {
      const teamIds = await getTeam();
      const teamDetails = await Promise.all(
        teamIds.map(member => fetchFullPokemonDetails(member.id))
      );
      setTeam(teamDetails.filter(pokemon => pokemon !== null));
    } catch (error) {
      console.error('Error loading team:', error);
      Alert.alert('Error', 'Failed to load team. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(useCallback(() => {
    loadTeam();
  }, []));

  const handleRemoveFromTeam = async (pokemon) => {
    try {
      await removeFromTeam(pokemon.id);
      setTeam(prev => prev.filter(member => member.id !== pokemon.id));
    } catch (error) {
      console.error('Error removing from team:', error);
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
        isFavorite={false}
        onFavoriteToggle={() => {}}
      />
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => handleRemoveFromTeam(item)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
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
      <Text style={styles.title}>My Team</Text>
      <Text style={styles.subtitle}>{team.length}/6 Pokémon</Text>
      
      {team.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Pokémon in your team!</Text>
          <Text style={styles.emptySubtext}>Add Pokémon to your team from the Home screen.</Text>
        </View>
      ) : (
        <FlatList
          data={team}
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
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  cardWrapper: {
    flex: 1,
    margin: 5,
  },
  removeButton: {
    backgroundColor: '#ff4757',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginTop: 8,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
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

export default TeamScreen; 