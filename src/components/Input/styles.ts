import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled(TextInput)`
  flex: 1;
  min-height: 50px;
  max-height: 50px;

  border-color: ${({ theme }) => theme.COLORS.RED_500};
  border-width: 1px;
  border-radius: 10px;

  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.LG}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BODY_REGULAR};
    color: ${({ theme }) => theme.COLORS.GRAY_800};
    text-align: center;
  `}

  padding: 12px
`;