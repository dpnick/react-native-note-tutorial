import StyledPressable from '@components/StyledPressable';
import { useNote } from '@contexts/NoteContext';
import { Feather } from '@expo/vector-icons';
import { HomeProps } from '@pages/Home';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export default function CreateButton() {
  const navigation = useNavigation<HomeProps>();
  const { selectNote } = useNote();

  const createNote = () => {
    // call this function without parameter will initiate a new note
    selectNote();
    navigation.navigate('NoteEdit');
  };

  return (
    <StyledPressable
      onPress={createNote}
      style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
      position='absolute'
      bottom={3}
      right={3}
      width={60}
      height={60}
      backgroundColor='primary'
      borderRadius={30}
      justifyContent='center'
      alignItems='center'
      borderWidth={0.5}
      borderColor='accent'
    >
      <Feather name='plus' size={40} color='white' />
    </StyledPressable>
  );
}
