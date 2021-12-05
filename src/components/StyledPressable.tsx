import styled from 'styled-components/native';
import {
  border,
  BorderProps,
  borderRadius,
  BorderRadiusProps,
  color,
  ColorProps,
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from 'styled-system';

export type StyledPressableProps = ColorProps &
  PositionProps &
  FlexboxProps &
  LayoutProps &
  SpaceProps &
  BorderProps &
  BorderRadiusProps;

const StyledPressable = styled.Pressable<StyledPressableProps>(
  compose(color, position, flexbox, layout, space, border, borderRadius)
);

export default StyledPressable;
