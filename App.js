/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NativeBaseProvider } from 'native-base';
import AppNavigator from './routes/HomeNavigator';

function App() {
  return (
    <NativeBaseProvider>
      <AppNavigator />
    </NativeBaseProvider>
  );
}

export default App;
