import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'pokemon_favorites';
const TEAM_KEY = 'pokemon_team';

// Get favorites from storage
export const getFavorites = async () => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

// Save favorites to storage
export const saveFavorites = async (favorites) => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

// Add Pokemon to favorites
export const addToFavorites = async (pokemon) => {
  try {
    const favorites = await getFavorites();
    const exists = favorites.some(fav => fav.id === pokemon.id);
    
    if (!exists) {
      // Only store the essential ID and name
      const newFavorites = [...favorites, { id: pokemon.id, name: pokemon.name }];
      await saveFavorites(newFavorites);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
};

// Remove Pokemon from favorites
export const removeFromFavorites = async (pokemonId) => {
  try {
    const favorites = await getFavorites();
    const newFavorites = favorites.filter(fav => fav.id !== pokemonId);
    await saveFavorites(newFavorites);
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
};

// Check if Pokemon is in favorites
export const isFavorite = async (pokemonId) => {
  try {
    const favorites = await getFavorites();
    return favorites.some(fav => fav.id === pokemonId);
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};

// Get team from storage
export const getTeam = async () => {
  try {
    const team = await AsyncStorage.getItem(TEAM_KEY);
    return team ? JSON.parse(team) : [];
  } catch (error) {
    console.error('Error getting team:', error);
    return [];
  }
};

// Save team to storage
export const saveTeam = async (team) => {
  try {
    await AsyncStorage.setItem(TEAM_KEY, JSON.stringify(team));
  } catch (error) {
    console.error('Error saving team:', error);
  }
};

// Add Pokemon to team (max 6)
export const addToTeam = async (pokemon) => {
  try {
    const team = await getTeam();
    if (team.length >= 6) {
      return false; // Team is full
    }
    
    const exists = team.some(member => member.id === pokemon.id);
    if (!exists) {
      // Only store the essential ID and name
      const newTeam = [...team, { id: pokemon.id, name: pokemon.name }];
      await saveTeam(newTeam);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to team:', error);
    return false;
  }
};

// Remove Pokemon from team
export const removeFromTeam = async (pokemonId) => {
  try {
    const team = await getTeam();
    const newTeam = team.filter(member => member.id !== pokemonId);
    await saveTeam(newTeam);
    return true;
  } catch (error) {
    console.error('Error removing from team:', error);
    return false;
  }
};

// Clear all pokemon data from storage
export const clearAllData = async () => {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
    await AsyncStorage.removeItem(TEAM_KEY);
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
}; 