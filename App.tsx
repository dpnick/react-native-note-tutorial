import NoteProvider from '@contexts/NoteContext';
import ThemeProvider from '@contexts/ThemeContext';
import Navigation from '@navigation/index';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

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
