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
    return `#${id.toString().padStart(3, '0')}`;
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
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2a2a3e',
    borderRadius: 15,
    padding: 15,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  pokemonId: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteButton: {
    padding: 5,
  },
  favoriteIcon: {
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  pokemonImage: {
    width: 80,
    height: 80,
  },
  pokemonName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 5,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 2,
  },
  typeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default PokemonCard; 