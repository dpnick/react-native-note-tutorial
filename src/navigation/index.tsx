import HomeStackNavigator from '@navigation/HomeStack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

export default function Navigation() {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
}
