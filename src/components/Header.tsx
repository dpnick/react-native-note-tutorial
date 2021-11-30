import StyledText from '@components/StyledText';
import StyledView from '@components/StyledView';
import { ThemeContext } from '@contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { Alert, Linking, Pressable, StatusBar } from 'react-native';

const TWITTER_NAME = '@dpnick_';
export const HEADER_FULL_HEIGHT = 300;

export default function Header() {
  const { isDarkTheme, switchTheme } = useContext(ThemeContext);

  const openTwitter = async () => {
    const url = 'https://twitter.com/dpnick_';
    try {
      const supported = await Linking.canOpenURL('https://twitter.com/dpnick_');
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    } catch {
      Alert.alert('Error opening Twitter');
    }
  };

  return (
    <StyledView
      bg='primary'
      position='absolute'
      width='100%'
      height={HEADER_FULL_HEIGHT}
      justifyContent='center'
      borderBottomLeftRadius={48}
      borderBottomRightRadius={48}
    >
      <StyledView padding={4}>
        <StyledText fontSize={6} color='white'>
          Welcome
        </StyledText>
        <Pressable
          onPress={openTwitter}
          style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1 })}
        >
          <StyledText fontSize={6} color='secondary' paddingLeft={36}>
            {TWITTER_NAME}
          </StyledText>
        </Pressable>
      </StyledView>
      <StyledView
        position='absolute'
        top={(StatusBar.currentHeight || 50) + 8}
        right={16}
      >
        <Pressable
          onPress={switchTheme}
          hitSlop={16}
          android_ripple={{ borderless: true, color: 'white' }}
          style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1 })}
        >
          <Feather
            name={isDarkTheme ? 'sun' : 'moon'}
            size={24}
            color='white'
          />
        </Pressable>
      </StyledView>
    </StyledView>
  );
}
