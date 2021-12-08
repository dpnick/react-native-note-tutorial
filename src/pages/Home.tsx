import CreateButton from '@components/CreateButton';
import Header, { HEADER_FULL_HEIGHT } from '@components/Header';
import MasonryList from '@components/MasonryList';
import SearchBar from '@components/SearchBar';
import StyledView from '@components/StyledView';
import { useNote } from '@contexts/NoteContext';
import useDebounce from '@hooks/useDebounce';
import { Note } from '@models/note';
import { HomeStackParamList } from '@navigation/HomeStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { compose, layout, LayoutProps, space, SpaceProps } from 'styled-system';

const StyledScrollView = styled.ScrollView<LayoutProps & SpaceProps>(
  compose(layout, space)
);

export type HomeProps = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

const SEARCH_INPUT_HEIGHT = 40;
const PADDING_TOP_CONTENT = 16;

export default function Home() {
  const { notes } = useNote();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search, 500);
  const { primary } = useTheme().colors;

  // allow to set local state in sync
  useEffect(() => {
    // avoid running it before notes initialized
    if (!notes) return;
    setFilteredNotes(notes);
    setIsLoading(false);
    setSearch('');
  }, [notes]);

  // run each time debouncedSearch change
  useEffect(() => {
    if (!notes) return;
    const nextData = notes.filter((note) =>
      note.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setFilteredNotes(nextData);
  }, [debouncedSearch]);

  return (
    <StyledView flex={1} alignItems='center' backgroundColor='background'>
      <StyledScrollView
        width='100%'
        p={16}
        pb={0}
        contentContainerStyle={{
          paddingTop:
            HEADER_FULL_HEIGHT + SEARCH_INPUT_HEIGHT + PADDING_TOP_CONTENT,
        }}
      >
        {isLoading ? (
          <ActivityIndicator size='large' color={primary} />
        ) : (
          <MasonryList
            notes={filteredNotes}
            search={search}
            userHasNotes={!!notes && notes?.length > 0}
          />
        )}
      </StyledScrollView>
      {notes && notes?.length > 0 && (
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder='Search a title...'
        />
      )}
      <CreateButton />
      <Header />
    </StyledView>
  );
}
