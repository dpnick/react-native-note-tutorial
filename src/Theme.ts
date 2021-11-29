import { DefaultTheme } from 'styled-components/native';

const lightTheme: DefaultTheme = {
  fontSizes: [12, 14, 16, 20, 24, 32, 36], // could also be defined as em
  space: [0, 4, 8, 16, 32, 64],
  colors: {
    primary: '#1A1B41',
    secondary: '#F4845F',
    background: '#FEFEFF',
    text: 'black',
    accent: '#d9dbda',
  },
};

const darkTheme: DefaultTheme = {
  fontSizes: [12, 14, 16, 20, 24, 32, 36],
  space: [0, 4, 8, 16, 32, 64],
  colors: {
    primary: '#7FC29B',
    secondary: '#334756',
    background: '#272838',
    text: 'white',
    accent: '#d9dbda',
  },
};

enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export { lightTheme, darkTheme, Theme };
