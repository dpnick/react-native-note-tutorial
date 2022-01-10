import StyledText from '@components/StyledText';
import StyledView from '@components/StyledView';
import { ThemeContext } from '@contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';
import {
  HEADER_FULL_HEIGHT,
  HEADER_MIN_HEIGHT,
  HEADER_SCROLL_DISTANCE,
} from '@models/layout';
import React, { useCallback, useContext } from 'react';
import { Alert, Linking, Pressable, StatusBar } from 'react-native';
import Animated, {
  Extrapolate,
  FadeInLeft,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const TWITTER_NAME = '@dpnick_';
const ICON_Y_OFFSET = 44;

const AnimatedHeaderView = Animated.createAnimatedComponent(StyledView);
const AnimatedText = Animated.createAnimatedComponent(StyledText);

interface HeaderProps {
  scroll: Animated.SharedValue<number>;
}

export default function Header({ scroll }: HeaderProps) {
  const { isDarkTheme, switchTheme } = useContext(ThemeContext);
  const themeAnim = useSharedValue(0);

  const toggleThemeMode = useCallback(() => {
    themeAnim.value = withSequence(
      withTiming(ICON_Y_OFFSET, undefined, (isFinished) => {
        if (isFinished) {
          runOnJS(switchTheme)();
        }
      }),
      withTiming(0)
    );
  }, [switchTheme]);

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

  const themeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: themeAnim.value }],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scroll.value,
      [0, HEADER_SCROLL_DISTANCE],
      [HEADER_FULL_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      scroll.value,
      [0, HEADER_SCROLL_DISTANCE],
      [48, 24],
      Extrapolate.CLAMP
    );
    return {
      height,
      borderBottomRightRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
    };
  });

  const titleOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scroll.value,
      [0, HEADER_SCROLL_DISTANCE / 2],
      [1, 0],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  });

  const reversetitleOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      scroll.value,
      [HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  });

  return (
    <AnimatedHeaderView
      bg='primary'
      position='absolute'
      width='100%'
      justifyContent='center'
      style={headerAnimatedStyle}
    >
      <AnimatedHeaderView padding={4} style={titleOpacity}>
        <AnimatedText
          entering={FadeInLeft.duration(1000)}
          fontSize={6}
          color='white'
        >
          Welcome
        </AnimatedText>
        <Pressable
          onPress={openTwitter}
          style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1 })}
        >
          <AnimatedText
            entering={FadeInLeft.duration(1000).delay(1000)}
            fontSize={6}
            color='secondary'
            paddingLeft={36}
          >
            {TWITTER_NAME}
          </AnimatedText>
        </Pressable>
      </AnimatedHeaderView>
      <AnimatedHeaderView
        position='absolute'
        top={(StatusBar.currentHeight || 40) + 8}
        alignSelf='center'
        style={reversetitleOpacity}
      >
        <StyledText color='white' fontSize={3}>
          {TWITTER_NAME}
        </StyledText>
      </AnimatedHeaderView>
      <AnimatedHeaderView
        style={themeStyle}
        position='absolute'
        top={(StatusBar.currentHeight || 40) + 8}
        right={16}
      >
        <Pressable
          onPress={toggleThemeMode}
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
      </AnimatedHeaderView>
    </AnimatedHeaderView>
  );
}
