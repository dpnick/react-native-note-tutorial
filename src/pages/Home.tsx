import Header, { HEADER_FULL_HEIGHT } from '@components/Header';
import MasonryList from '@components/MasonryList';
import StyledView from '@components/StyledView';
import { useNote } from '@contexts/NoteContext';
import { HomeStackParamList } from '@navigation/HomeStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components/native';
import { compose, layout, LayoutProps, space, SpaceProps } from 'styled-system';

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
