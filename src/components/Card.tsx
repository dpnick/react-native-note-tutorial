import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { Pressable } from 'react-native';
import { Note } from '../models/note';
import StyledText from './StyledText';
import StyledView, { StyledViewProps } from './StyledView';

interface CardProps extends StyledViewProps {
  note: Note;
  showNoteEdit: (id: number, title: string) => void;
}

export default function Card({ note, showNoteEdit, ...props }: CardProps) {
  const showDetail = () => {
    showNoteEdit(note.id, note.title);
  };

  return (
    <Pressable
      onPress={showDetail}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      <StyledView {...props}>
        <StyledText
          color='white'
          numberOfLines={1}
          fontWeight='bold'
          fontSize={2}
        >
          {note.title}
        </StyledText>
        <StyledText color='accent' mb={8}>
          {formatDistanceToNow(note.updatedAt, {
            addSuffix: true,
          })}
        </StyledText>
        <StyledText color='whitesmoke' numberOfLines={8}>
          {note.content}
        </StyledText>
      </StyledView>
    </Pressable>
  );
}
