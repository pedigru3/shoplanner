import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  min-height: 50px;
  max-height: 50px;

  background-color: ${({ theme }) => theme.COLORS.RED_800};
  justify-content: start;
  align-items: center;

  padding-left: 16px;
  padding-right: 16px;

  border-radius: 20px;
  margin-bottom: 10px;

  flex-direction: row;
`;

export const ItemName = styled.Text`
  flex: 1;
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XL}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BODY_REGULAR};
    color: ${({ theme }) => theme.COLORS.WHITE};
  `}
`

export const Presseble = styled(TouchableOpacity)``
