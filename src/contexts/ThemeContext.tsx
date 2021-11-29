import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { Alert, useColorScheme } from 'react-native';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { StorageKeys } from '../models/storage';
import { darkTheme, lightTheme } from '../Theme';

// create context with default value
interface IThemeContext {
  isDarkTheme: boolean | undefined;
  switchTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  isDarkTheme: undefined,
  switchTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // get from OS user prefered theme
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState<boolean>();

  // on component first render => check if we have a theme value in async storage
  // otherwise => take user prefered theme
  useEffect(() => {
    const setUserTheme = async () => {
      try {
        const useDarkMode = await AsyncStorage.getItem(
          StorageKeys.USE_DARK_THEME
        );
        let result = colorScheme === 'dark';
        if (useDarkMode !== null) {
          result = JSON.parse(useDarkMode);
        }
        setIsDark(result);
      } catch {
        Alert.alert('An error occured getting your saved theme');
      }
    };
    setUserTheme();
  }, []);

  // update theme & set the new value to async storage
  const switchTheme = async () => {
    setIsDark((prev) => !prev);
    try {
      await AsyncStorage.setItem(
        StorageKeys.USE_DARK_THEME,
        JSON.stringify(!isDark)
      );
    } catch {
      Alert.alert('An error occured while updating theme');
    }
  };

  // wrap `styled-components` provider with our own one
  // according to `isDark` provide the corresponding theme from `Theme.ts`
  // every `children` will have access to `isDarkTheme`, `switchTheme` and `theme`
  return (
    <ThemeContext.Provider
      value={{
        isDarkTheme: isDark,
        switchTheme,
      }}
    >
      <StyledThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
