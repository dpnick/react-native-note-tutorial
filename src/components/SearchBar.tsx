import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { HEADER_FULL_HEIGHT } from './Header';
import StyledView from './StyledView';

interface SearchBarInterface {
  value: string;
  onChangeText: (next: string) => void;
  placeholder: string;
}

const PADDING_TOP_BAR = 16;

export default function SearchBar({
  value,
  onChangeText,
  placeholder,
}: SearchBarInterface) {
  return (
    <StyledView
      p={3}
      pt={0}
      width='100%'
      position='absolute'
      borderBottomLeftRadius={24}
      borderBottomRightRadius={24}
      top={HEADER_FULL_HEIGHT + PADDING_TOP_BAR}
    >
      <StyledView
        bg='accent'
        borderRadius={8}
        flexDirection='row'
        justifyContent='flex-start'
        alignItems='center'
        height={40}
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
    </StyledView>
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
