import StyledView from '@components/StyledView';
import { SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import { useTheme } from 'styled-components/native';
import StyledText from './StyledText';

interface EmptyListProps {
  icon: 'ghost' | 'present';
  message: string;
}

export default function EmptyList({ message, icon }: EmptyListProps) {
  // allow to get values from current theme
  // to use it in non-styled component for example (icon in this case)
  const { text } = useTheme().colors;

  return (
    <StyledView flex={1} justifyContent='center' alignItems='center'>
      <SimpleLineIcons name={icon} size={48} color={text} />
      <StyledText color='text' mt={12} fontSize={2} textAlign='center'>
        {message}
      </StyledText>
    </StyledView>
  );
}
