import { createTheme } from '@rneui/themed';

const themeColors = {
  primary: '#58C8B8',    // Main minty green
  secondary: '#FFCB05',   // Accent yellow
  background: '#F0FAF8', // A very light, almost white, mint color
  text: '#3D4D5A',        // A professional, soft dark blue-grey
  white: '#FFFFFF',
  error: '#EF4B4B',
  grey: '#a9a9a9',
};

export const pokemonHomeTheme = createTheme({
  lightColors: {
    primary: themeColors.primary,
    secondary: themeColors.secondary,
    background: themeColors.white,
    text: themeColors.text,
    error: themeColors.error,
  },
  mode: 'light',
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
        padding: 0,
      },
      inputContainerStyle: {
        backgroundColor: themeColors.white,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderBottomWidth: 1,
      },
      inputStyle: {
        color: themeColors.text,
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
    normal: '#C6C6A7',
    fire: '#F5AC78',
    water: '#9DB7F5',
    electric: '#FAE078',
    grass: '#A7DB8A',
    ice: '#BCE6E6',
    fighting: '#D67873',
    poison: '#C183C1',
    ground: '#EBD69D',
    flying: '#C6B7F5',
    psychic: '#FA92B2',
    bug: '#C6D16E',
    rock: '#D1C17D',
    ghost: '#A292BC',
    dragon: '#A27DFA',
    dark: '#A29288',
    steel: '#D1D1E0',
    fairy: '#F4BDC9'
  },
}); 