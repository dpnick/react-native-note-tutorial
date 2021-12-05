import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import StyledView from './StyledView';

const screen = Dimensions.get('screen');

function getRandomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

interface NoteEditBackgroundProps {
  color: string;
}

// this component is just a funny circle background with random positioning
export default function NoteEditBackground({ color }: NoteEditBackgroundProps) {
  const [leftOffset, setLeftOffset] = useState<number>();
  const [topOffset, setTopOffset] = useState<number>();
  const { width, height } = screen;
  const shapeSize = width;

  useEffect(() => {
    // you can experiment with those values to find a result that suits you
    setLeftOffset(getRandomInRange(-shapeSize / 2, shapeSize / 2));
    setTopOffset(getRandomInRange(0 - shapeSize / 2, height - shapeSize / 2));
  }, []);

  return (
    <StyledView
      position='absolute'
      width={shapeSize}
      height={shapeSize}
      left={leftOffset}
      top={topOffset}
      pointerEvents='none'
      borderRadius={shapeSize / 2}
      opacity={0.2}
      bg={color}
      zIndex={-1}
    />
  );
}
