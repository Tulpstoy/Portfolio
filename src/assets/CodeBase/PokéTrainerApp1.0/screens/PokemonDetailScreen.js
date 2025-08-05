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
  };

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
    return `#${id.toString().padStart(3, '0')}`;
  };

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatStat = (stat) => {
    return stat.charAt(0).toUpperCase() + stat.slice(1).replace('-', ' ');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.pokemonId}>{formatId(pokemon.id)}</Text>
          <Text style={styles.pokemonName}>{capitalizeFirst(pokemon.name)}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default }}
            style={styles.pokemonImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.typesContainer}>
          {pokemon.types?.map((typeInfo, index) => (
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

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, isFavorite && styles.activeActionButton]}
            onPress={handleFavoriteToggle}
          >
            <Text style={styles.actionButtonText}>
              {isFavorite ? '❤️' : '🤍'} {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, isInTeam && styles.activeActionButton]}
            onPress={handleTeamToggle}
          >
            <Text style={styles.actionButtonText}>
              {isInTeam ? '❌' : '⚔️'} {isInTeam ? 'Remove from Team' : 'Add to Team'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Basic Info</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Height:</Text>
            <Text style={styles.infoValue}>{pokemon.height / 10}m</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Weight:</Text>
            <Text style={styles.infoValue}>{pokemon.weight / 10}kg</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Base Experience:</Text>
            <Text style={styles.infoValue}>{pokemon.base_experience}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Base Stats</Text>
          {pokemon.stats?.map((stat, index) => (
            <View key={index} style={styles.statRow}>
              <Text style={styles.statLabel}>{formatStat(stat.stat.name)}:</Text>
              <View style={styles.statBarContainer}>
                <View style={[styles.statBar, { width: `${(stat.base_stat / 255) * 100}%` }]} />
              </View>
              <Text style={styles.statValue}>{stat.base_stat}</Text>
            </View>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Abilities</Text>
          {pokemon.abilities?.map((ability, index) => (
            <View key={index} style={styles.abilityRow}>
              <Text style={styles.abilityText}>
                {capitalizeFirst(ability.ability.name.replace('-', ' '))}
                {ability.is_hidden && ' (Hidden)'}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pokemonId: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 5,
  },
  pokemonName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pokemonImage: {
    width: 200,
    height: 200,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  typeBadge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  typeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionsContainer: {
    marginBottom: 30,
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#2a2a3e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
  },
  activeActionButton: {
    backgroundColor: '#ff6b6b',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  infoSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#cccccc',
  },
  infoValue: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#cccccc',
    width: 100,
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#2a2a3e',
    borderRadius: 4,
    marginHorizontal: 10,
  },
  statBar: {
    height: '100%',
    backgroundColor: '#ff6b6b',
    borderRadius: 4,
  },
  statValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
    width: 30,
    textAlign: 'right',
  },
  abilityRow: {
    marginBottom: 8,
  },
  abilityText: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default PokemonDetailScreen; 