import styled from 'styled-components/native';
import {
  color,
  ColorProps,
  compose,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system';

export type StyledTextProps = ColorProps & SpaceProps & TypographyProps;
const StyledText = styled.Text<StyledTextProps>(
  compose(color, space, typography)
);

export default StyledText;
