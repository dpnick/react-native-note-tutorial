import NoteProvider from '@contexts/NoteContext';
import ThemeProvider from '@contexts/ThemeContext';
import Navigation from '@navigation/index';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableFreeze } from 'react-native-screens';

enableFreeze(true);

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NoteProvider>
          <Navigation />
          <StatusBar style='auto' animated />
        </NoteProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
