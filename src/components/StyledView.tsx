import styled from 'styled-components/native';
import {
  borderRadius,
  BorderRadiusProps,
  color,
  ColorProps,
  compose,
  flex,
  flexbox,
  FlexboxProps,
  FlexProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from 'styled-system';

export type StyledViewProps = ColorProps &
  SpaceProps &
  PositionProps &
  FlexProps &
  FlexboxProps &
  LayoutProps &
  BorderRadiusProps;

const StyledView = styled.View<StyledViewProps>(
  compose(color, space, position, flex, flexbox, layout, borderRadius)
);

export default StyledView;
