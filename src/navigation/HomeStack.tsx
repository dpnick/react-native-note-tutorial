import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTheme } from 'styled-components/native';
import StyledView from '../components/StyledView';
import Home from '../pages/Home';
import NoteEdit from '../pages/NoteEdit';

export type HomeStackParamList = {
  Home: undefined;
  NoteEdit: { id: number; title: string };
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  const { background, text } = useTheme().colors;
  // by default => go to Home
  return (
    <StyledView flex={1} backgroundColor='background'>
      <HomeStack.Navigator initialRouteName='Home'>
        <HomeStack.Screen
          name='Home'
          component={Home}
          options={() => ({
            headerShown: false,
          })}
        />
        <HomeStack.Screen
          name='NoteEdit'
          component={NoteEdit}
          options={({ route }) => ({
            headerStyle: { backgroundColor: background },
            headerTintColor: text,
            headerTitle: route.params.title,
          })}
        />
      </HomeStack.Navigator>
    </StyledView>
  );
}
