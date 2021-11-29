import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import NoteProvider from './src/contexts/NoteContext';
import ThemeProvider from './src/contexts/ThemeContext';
import Navigation from './src/navigation';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemeProvider>
        <NoteProvider>
          <Navigation />
        </NoteProvider>
        <StatusBar style='auto' />
      </ThemeProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
