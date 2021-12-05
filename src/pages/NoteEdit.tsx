import ColorButton from '@components/ColorButton';
import NoteEditBackground from '@components/NoteEditBackground';
import StyledText from '@components/StyledText';
import StyledView from '@components/StyledView';
import { useNote } from '@contexts/NoteContext';
import { Feather } from '@expo/vector-icons';
import useDebounce from '@hooks/useDebounce';
import { NoteColors } from '@models/note';
import { HomeStackParamList } from '@navigation/HomeStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import {
  Platform,
  Pressable,
  StatusBar,
  TextInput,
  TextInputProps,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled, { useTheme } from 'styled-components/native';
import {
  color,
  ColorProps,
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system';

type StyledInputProps = ColorProps &
  SpaceProps &
  FlexboxProps &
  LayoutProps &
  TypographyProps;

const StyledInput = styled.TextInput<TextInputProps & StyledInputProps>(
  compose(color, space, flexbox, layout, typography)
);

type NoteEditProps = NativeStackScreenProps<HomeStackParamList, 'NoteEdit'>;

const availableColors: NoteColors[] = ['primary', 'secondary'];

export default function NoteEdit({ navigation }: NoteEditProps) {
  const { selectedNote, updateNote, createNote, deleteNote, updateNoteColor } =
    useNote();
  const input = useRef<TextInput>(null);
  const { text, accent } = useTheme().colors;
  // debounce title change
  const [nextTitle, setNextTitle] = useState<string | null>(null);
  // trigger change 300ms after last nextTitle update
  const debouncedTitle = useDebounce<string | null>(nextTitle, 300);
  // debounce content change
  const [nextContent, setNextContent] = useState<string | null>(null);
  // trigger change 300ms after last nextContent update
  const debouncedContent = useDebounce<string | null>(nextContent, 300);

  useEffect(() => {
    // focus content input on init
    // autofocus doesn't work on android
    if (Platform.OS === 'android' && input.current) {
      input.current?.focus();
    }
  }, []);

  useEffect(() => {
    // sync our local state with selected note asap
    // avoid running if selectedNote not defined
    if (!selectedNote) return;
    setNextTitle(selectedNote.title);
    setNextContent(selectedNote.content);
  }, [selectedNote]);

  // effect triggered when debouncedTitle or debouncedContent change
  useEffect(() => {
    // check if nextTitle is initiated and has a value !== from previous
    // allow to continue even if we have empty strings
    const validTitle =
      nextTitle !== null &&
      nextTitle?.trim()?.length >= 0 &&
      nextTitle !== selectedNote?.title;
    // same thing for nextContent
    const validContent =
      nextContent !== null &&
      nextContent?.trim()?.length >= 0 &&
      nextContent !== selectedNote?.content;
    if (validTitle || validContent) {
      // if it's a new note one of them can be null => replace by empty string
      let title = nextTitle ?? '';
      let content = nextContent ?? '';
      // no selected note means it's a new one
      if (!selectedNote) {
        return createNote(title, content);
      }
      updateNote(selectedNote.id, title, content);
    }
  }, [debouncedTitle, debouncedContent]);

  const updateNoteOnTextChange = (text: string) => setNextContent(text);
  const updateNoteOnTitleChange = (text: string) => setNextTitle(text);
  const deleteCurrentNote = () => {
    deleteNote(selectedNote!.id);
    navigation.goBack();
  };

  const goBack = () => {
    // delete note if completely empty on go back
    if (
      selectedNote &&
      nextTitle?.trim()?.length === 0 &&
      nextContent?.trim()?.length === 0
    ) {
      deleteNote(selectedNote.id);
    }
    navigation.goBack();
  };

  const changeNoteColor = (color: NoteColors) => {
    updateNoteColor(selectedNote!.id, color);
  };

  return (
    <StyledView flex={1} pl={3} pr={3} backgroundColor='background'>
      <StyledView
        flexDirection='row'
        height={50}
        alignItems='center'
        marginTop={StatusBar.currentHeight || 40}
      >
        <Pressable
          onPress={goBack}
          hitSlop={16}
          android_ripple={{ borderless: true, color: 'primary' }}
          style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1 })}
        >
          <Feather name='arrow-left' size={24} color={text} />
        </Pressable>
        <StyledInput
          defaultValue={selectedNote?.title}
          onChangeText={updateNoteOnTitleChange}
          placeholder='Enter a cool title here'
          placeholderTextColor='gray'
          color='text'
          width='100%'
          height='100%'
          flexShrink={1}
          fontSize={2}
          fontWeight='900'
          mr={3}
          ml={3}
        />
        {selectedNote && (
          <Pressable
            onPress={deleteCurrentNote}
            hitSlop={16}
            android_ripple={{ borderless: true, color: 'primary' }}
            style={({ pressed }) => ({ opacity: pressed ? 0.3 : 1 })}
          >
            <Feather name='trash-2' size={24} color='red' />
          </Pressable>
        )}
      </StyledView>
      {selectedNote && (
        <StyledView
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          height={50}
        >
          <StyledText color='grey'>
            {`Created ${formatDistanceToNow(selectedNote.createdAt, {
              addSuffix: true,
            })}`}
          </StyledText>
          <StyledView flexDirection='row' alignItems='center'>
            {availableColors.map((color) => (
              <ColorButton
                key={color}
                color={color}
                selected={color === selectedNote?.color}
                onPress={changeNoteColor}
              />
            ))}
          </StyledView>
        </StyledView>
      )}
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{ paddingVertical: 16 }}
      >
        <StyledInput
          ref={input}
          autoFocus
          multiline
          scrollEnabled={false}
          defaultValue={selectedNote?.content}
          onChangeText={updateNoteOnTextChange}
          placeholder='Enter your note here'
          placeholderTextColor='gray'
          color='text'
        />
      </KeyboardAwareScrollView>
      <NoteEditBackground
        color={selectedNote ? selectedNote.color : 'primary'}
      />
    </StyledView>
  );
}
