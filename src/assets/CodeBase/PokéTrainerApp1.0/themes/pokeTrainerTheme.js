import { createTheme } from '@rneui/themed';

const themeColors = {
  primary: '#ff6b6b',
  secondary: '#4ecdc4',
  background: '#1a1a2e',
  text: '#ffffff',
  white: '#FFFFFF',
  error: '#ff4757',
  grey: '#666666',
};

export const pokeTrainerTheme = createTheme({
  lightColors: { // RNEUI requires both light and dark, we'll just use the same for both modes
    primary: themeColors.primary,
    secondary: themeColors.secondary,
    background: themeColors.background,
    text: themeColors.text,
    error: themeColors.error,
  },
  darkColors: {
    primary: themeColors.primary,
    secondary: themeColors.secondary,
    background: themeColors.background,
    text: themeColors.text,
    error: themeColors.error,
  },
  mode: 'dark',
  components: {
    Button: {
      buttonStyle: {
        borderRadius: 25,
        height: 50,
      },
      titleStyle: {
        fontWeight: 'bold',
      }
    },
    SearchBar: {
      containerStyle: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
      },
      inputContainerStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    },
    Text: {
      style: {
        color: themeColors.text,
        fontFamily: 'Montserrat_400Regular',
      }
    }
  },
  typeColors: {
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
    fairy: '#EE99AC'
  },
}); 