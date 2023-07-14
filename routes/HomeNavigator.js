import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';

const { Navigator, Screen } = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={HomePage} />
      <Screen name="Detail Page" component={DetailPage} />
    </Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
