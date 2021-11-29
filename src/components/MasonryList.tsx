import SimpleLineIcons from '@expo/vector-icons/build/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { useTheme } from 'styled-components/native';
import { Note } from '../models/note';
import { HomeProps } from '../pages/Home';
import Card from './Card';
import StyledText from './StyledText';
import StyledView from './StyledView';

interface MasonryListProps {
  notes: Note[];
}

function MasonryList({ notes }: MasonryListProps) {
  const navigation = useNavigation<HomeProps>();
  const { text } = useTheme().colors;

  const showNoteEdit = (id: number, title: string) => {
    navigation.navigate('NoteEdit', { id, title });
  };

  return (
    <StyledView flexDirection='row'>
      {notes?.length > 0 ? (
        [...Array(2).keys()].map((column) => {
          return (
            <StyledView
              key={column.toString()}
              flex={1 / 2}
              flexDirection='column'
              margin={1}
            >
              {notes
                .map((note, index) => {
                  if (index % 2 === column) {
                    return (
                      <Card
                        key={note.id.toString()}
                        note={note}
                        showNoteEdit={showNoteEdit}
                        bg={note.color}
                        p={3}
                        borderRadius={16}
                        mb={2}
                      />
                    );
                  }
                  return null;
                })
                .filter((element) => !!element)}
            </StyledView>
          );
        })
      ) : (
        <StyledView flex={1} justifyContent='center' alignItems='center'>
          <SimpleLineIcons name='ghost' size={48} color={text} />
          <StyledText color='text' mt={12} fontSize={2} textAlign='center'>
            No corresponding result
          </StyledText>
        </StyledView>
      )}
    </StyledView>
  );
}

export default memo(MasonryList);
