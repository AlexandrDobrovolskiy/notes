import { DefaultTheme } from 'react-native-paper';

const white = 'white';
// eslint-disable-next-line no-unused-vars
const black = 'black';
const gray = 'gray';

const amber = '#ffc107';
const amberDark = '#c79100';

const grey = '#e0e0e0';

const Screen = {
  BG: white,
};

const Header = {
  HEADER_BG: black,
  HEADER_LINE: gray,
  HEADER_TEXT: white,
};

const Card = {
  CARD_BG: grey,
  LIKE_COLOR: amber,
  DOT_COLOR: amberDark,
  SHOW_MORE_COLOR: amberDark,
};

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: amber,
    accent: white,
  },
};


module.exports = {
  appTheme,
  ...Screen,
  ...Header,
  ...Card,
};