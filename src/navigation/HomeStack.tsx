import StyledView from '@components/StyledView';
import Home from '@pages/Home';
import NoteEdit from '@pages/NoteEdit';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

export type HomeStackParamList = {
  Home: undefined;
  NoteEdit: undefined;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  // by default => go to Home
  return (
    <StyledView flex={1} backgroundColor='background'>
      <HomeStack.Navigator
        initialRouteName='Home'
        screenOptions={{ headerShown: false }}
      >
        <HomeStack.Screen name='Home' component={Home} />
        <HomeStack.Screen name='NoteEdit' component={NoteEdit} />
      </HomeStack.Navigator>
    </StyledView>
  );
}
