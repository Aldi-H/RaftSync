/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NativeBaseProvider } from 'native-base';
import AppNavigator from './routes/HomeNavigator';
import theme from './style/theme';

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <AppNavigator />
    </NativeBaseProvider>
  );
}

export default App;
