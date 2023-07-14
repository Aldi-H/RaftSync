import { extendTheme } from 'native-base';

const theme = extendTheme({
  fontConfig: {
    Roboto: {
      300: {
        normal: 'Roboto-Light',
        italic: 'Roboto-LightItalic',
      },
      400: {
        normal: 'Roboto-Regular',
        italic: 'Roboto-Italic',
      },
      500: {
        normal: 'Roboto-Medium',
        italic: 'Roboto-MediumItalic',
      },
      700: {
        normal: 'Roboto-Bold',
        italic: 'Roboto-BoldItalic',
      },
      900: {
        normal: 'Roboto-Black',
        italic: 'Roboto-BlackItalic',
      },
    },
  },

  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
    mono: 'Roboto',
  },
});

export default theme;
