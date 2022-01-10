import { Feather } from '@expo/vector-icons';
import {
  HEADER_FULL_HEIGHT,
  HEADER_MIN_HEIGHT,
  HEADER_SCROLL_DISTANCE,
  PADDING_TOP_BAR,
  SEARCH_BAR_HEIGHT,
} from '@models/layout';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import StyledView from './StyledView';

interface SearchBarInterface {
  value: string;
  onChangeText: (next: string) => void;
  placeholder: string;
  scroll: Animated.SharedValue<number>;
}

const AnimatedSearchView = Animated.createAnimatedComponent(StyledView);

export default function SearchBar({
  value,
  onChangeText,
  placeholder,
  scroll,
}: SearchBarInterface) {
  const searchAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scroll.value,
      [0, HEADER_SCROLL_DISTANCE],
      [
        HEADER_FULL_HEIGHT + PADDING_TOP_BAR,
        HEADER_MIN_HEIGHT - SEARCH_BAR_HEIGHT - PADDING_TOP_BAR,
      ],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY }],
    };
  });

  return (
    <AnimatedSearchView
      px={20}
      pb={16}
      width='100%'
      position='absolute'
      style={searchAnimatedStyle}
      backgroundColor='transparent'
      zIndex={1}
    >
      <StyledView
        bg='accent'
        borderRadius={8}
        flexDirection='row'
        justifyContent='flex-start'
        alignItems='center'
        height={SEARCH_BAR_HEIGHT}
      >
        <Feather
          name='search'
          size={20}
          color='black'
          style={styles.iconStart}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
        {value?.length > 0 && (
          <Feather
            name='x'
            size={24}
            color='black'
            style={styles.iconEnd}
            onPress={() => onChangeText('')}
          />
        )}
      </StyledView>
    </AnimatedSearchView>
  );
}

const styles = StyleSheet.create({
  iconStart: {
    marginLeft: 8,
  },
  iconEnd: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    paddingVertical: 4,
  },
});
