import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { subDays, subMonths } from 'date-fns';
import React from 'react';
import styled from 'styled-components/native';
import { compose, layout, LayoutProps, space, SpaceProps } from 'styled-system';
import Header, { HEADER_FULL_HEIGHT } from '../components/Header';
import MasonryList from '../components/MasonryList';
import StyledView from '../components/StyledView';
import { useNote } from '../contexts/NoteContext';
import { Note } from '../models/note';
import { HomeStackParamList } from '../navigation/HomeStack';

const EXAMPLE_NOTES: Note[] = [
  {
    id: 1,
    title: 'First',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\n Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    color: 'secondary',
  },
  {
    id: 2,
    title: 'Second',
    createdAt: subMonths(Date.now(), 3).getTime(),
    updatedAt: subDays(Date.now(), 1).getTime(),
    content: `Lorem Ipsum is simply dummy text`,
    color: 'primary',
  },
  {
    id: 3,
    title: 'Third',
    createdAt: subDays(Date.now(), 10).getTime(),
    updatedAt: subDays(Date.now(), 5).getTime(),
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    color: 'primary',
  },
  {
    id: 4,
    title: 'Fourth',
    createdAt: subDays(Date.now(), 22).getTime(),
    updatedAt: subDays(Date.now(), 20).getTime(),
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum.`,
    color: 'secondary',
  },
];

const StyledScrollView = styled.ScrollView<LayoutProps & SpaceProps>(
  compose(layout, space)
);

export type HomeProps = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

export default function Home() {
  const { notes } = useNote();

  return (
    <StyledView flex={1} alignItems='center' backgroundColor='background'>
      <StyledScrollView
        width='100%'
        p={16}
        pb={0}
        contentContainerStyle={{ paddingTop: HEADER_FULL_HEIGHT }}
      >
        <MasonryList notes={notes} />
      </StyledScrollView>
      <Header />
    </StyledView>
  );
}
