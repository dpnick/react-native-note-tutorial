import StyledText from '@components/StyledText';
import StyledView, { StyledViewProps } from '@components/StyledView';
import { Note } from '@models/note';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { Pressable } from 'react-native';

// each card will receive the following as props
// but can also be styled from parent thanks to the extend
interface NoteCardProps extends StyledViewProps {
  note: Note;
  showNoteEdit: (id: number, title: string) => void;
}

// "...props" represent all possible styling props
export default function NoteCard({
  note,
  showNoteEdit,
  ...props
}: NoteCardProps) {
  // call navigate function from parent (props)
  const showDetail = () => showNoteEdit(note.id, note.title);

  // wrap a card with a pressable element to allow navigation on click
  // use date-fns method 'formatDistanceToNow' to make our timestamp human-readable
  // using our generic component to create the desired style
  // 'numberOfLines' allow us to limit the content preview to 8 lines
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
