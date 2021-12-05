import { NoteColors } from '@models/note';
import React from 'react';
import StyledPressable from './StyledPressable';

interface ColorButtonProps {
  color: NoteColors;
  selected: boolean;
  onPress: (color: NoteColors) => void;
}

export default function ColorButton({
  color,
  selected,
  onPress,
}: ColorButtonProps) {
  return (
    <StyledPressable
      onPress={() => onPress(color)}
      style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
      width={30}
      height={30}
      backgroundColor={color}
      borderRadius={15}
      borderWidth={selected ? 5 : 0}
      borderColor={color}
      borderStyle='dotted'
      marginLeft={1}
      marginRight={1}
    />
  );
}
