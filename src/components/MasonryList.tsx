import NoteCard from '@components/NoteCard';
import StyledView from '@components/StyledView';
import { useNote } from '@contexts/NoteContext';
import { Note } from '@models/note';
import { HomeProps } from '@pages/Home';
import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import EmptyList from './EmptyList';

// we pass the list of note as props to our component
interface MasonryListProps {
  notes: Note[];
  search: string;
  userHasNotes: boolean;
}

function compareDateDesc(first: Note, second: Note) {
  let result = 0;
  if (second.updatedAt < first.updatedAt) {
    result = -1;
  }
  if (second.updatedAt > first.updatedAt) {
    result = 1;
  }
  return result;
}

function MasonryList({ notes, search, userHasNotes }: MasonryListProps) {
  // navigation use HomeProps bc this component live in this route
  const navigation = useNavigation<HomeProps>();
  const { selectNote } = useNote();

  // function passed to each NoteCard as prop
  const showNoteEdit = (id: number) => {
    // select the clicked note in our state (see NoteContext)
    selectNote(id);
    navigation.navigate('NoteEdit');
  };

  if (!userHasNotes) {
    return <EmptyList message='Start by creating a note 👇' icon='present' />;
  }
  // explanation bellow
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
                .sort(compareDateDesc)
                .map((note, index) => {
                  if (index % 2 === column) {
                    return (
                      <NoteCard
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
        <EmptyList
          message={`No corresponding result for ${search}`}
          icon='ghost'
        />
      )}
    </StyledView>
  );
}

export default memo(MasonryList);
