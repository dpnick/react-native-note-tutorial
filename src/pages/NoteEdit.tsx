import StyledText from '@components/StyledText';
import StyledView from '@components/StyledView';
import { useNote } from '@contexts/NoteContext';
import { HomeStackParamList } from '@navigation/HomeStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useRef } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { useTheme } from 'styled-components/native';

type NoteEditProps = NativeStackScreenProps<HomeStackParamList, 'NoteEdit'>;

export default function NoteEdit({ route }: NoteEditProps) {
  const { selectedNote, updateNote, selectNote } = useNote();
  const input = useRef<TextInput>(null);
  const { text } = useTheme().colors;
  const { id } = route.params;

  useEffect(() => {
    selectNote(id);
    input.current?.focus();
  }, []);

  const updateNoteOnTextChange = (text: string) => {
    updateNote(selectedNote!.id, text);
  };

  if (selectedNote) {
    return (
      <StyledView flex={1} padding={3} backgroundColor='background'>
        <StyledText paddingBottom={3} color='grey'>
          {`Created ${formatDistanceToNow(selectedNote!.createdAt, {
            addSuffix: true,
          })}`}
        </StyledText>
        <ScrollView keyboardDismissMode='interactive'>
          <TextInput
            ref={input}
            multiline={true}
            defaultValue={selectedNote.content}
            onChangeText={updateNoteOnTextChange}
            style={{ color: text }}
          ></TextInput>
        </ScrollView>
      </StyledView>
    );
  }
  return null;
}
