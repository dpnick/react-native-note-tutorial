import StyledView from '@components/StyledView';
import { SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import { useTheme } from 'styled-components/native';
import StyledText from './StyledText';

interface EmptyListProps {
  icon: 'ghost' | 'present';
  content: string;
}

export default function EmptyList({ content, icon }: EmptyListProps) {
  const { text } = useTheme().colors;

  return (
    <StyledView flex={1} justifyContent='center' alignItems='center'>
      <SimpleLineIcons name={icon} size={48} color={text} />
      <StyledText color='text' mt={12} fontSize={2} textAlign='center'>
        {content}
      </StyledText>
    </StyledView>
  );
}
