import styled, { css } from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 32px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XXXL}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BODY_REGULAR};
    color: ${({ theme }) => theme.COLORS.RED_600};
    text-align: center;
  `}
`

export const Space = styled.View`
  height: 20px;
`

export const Box = styled.View`
  width: 300px;
  align-self: center;
`

export const Hello = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XXXL}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BODY_REGULAR};
    color: ${({ theme }) => theme.COLORS.RED_600};
  `}
`

export const Name = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XXXL}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BODY_BOLD};
    color: ${({ theme }) => theme.COLORS.RED_600};
    line-height: 37px;
  `}
`