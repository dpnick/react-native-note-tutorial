import CreateButton from '@components/CreateButton';
import Header from '@components/Header';
import MasonryList from '@components/MasonryList';
import SearchBar from '@components/SearchBar';
import StyledView from '@components/StyledView';
import { useNote } from '@contexts/NoteContext';
import { ThemeContext } from '@contexts/ThemeContext';
import useDebounce from '@hooks/useDebounce';
import {
  HEADER_FULL_HEIGHT,
  PADDING_TOP_BAR,
  SEARCH_BAR_HEIGHT,
} from '@models/layout';
import { Note } from '@models/note';
import { HomeStackParamList } from '@navigation/HomeStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import { compose, layout, LayoutProps, space, SpaceProps } from 'styled-system';

const StyledScrollView = styled.ScrollView<LayoutProps & SpaceProps>(
  compose(layout, space)
);

const AnimatedScrollView = Animated.createAnimatedComponent(StyledScrollView);

export type HomeProps = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

const PADDING_VERTICAL_SEARCH = 32;

export default function Home() {
  const { notes } = useNote();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search, 500);
  const { isDarkTheme } = useContext(ThemeContext);

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

  const headerScroll = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    headerScroll.value = event.contentOffset.y;
  });

  return (
    <StyledView flex={1} alignItems='center' backgroundColor='background'>
      <AnimatedScrollView
        width='100%'
        px={16}
        contentContainerStyle={{
          paddingTop:
            HEADER_FULL_HEIGHT + SEARCH_BAR_HEIGHT + PADDING_TOP_BAR * 2,
        }}
        keyboardShouldPersistTaps='never'
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        bounces={false}
      >
        <MasonryList
          notes={filteredNotes}
          search={search}
          isLoading={isLoading}
          userHasNotes={!!notes && notes?.length > 0}
        />
      </AnimatedScrollView>
      {notes && notes?.length > 0 && (
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder='Search a title...'
          scroll={headerScroll}
        />
      )}
      <CreateButton />
      <Header scroll={headerScroll} />
    </StyledView>
  );
}
