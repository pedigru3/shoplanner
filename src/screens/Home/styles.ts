import styled, { css } from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
`;

export const Header = styled.View`
  background-color: ${({theme}) => theme.COLORS.RED_100};
  padding: 32px;
  border-radius: 20px;
`

export const Hello = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XXL}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BODY_REGULAR};
    color: ${({ theme }) => theme.COLORS.RED_600};
  `}
`

export const Name = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XXL}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BODY_BOLD};
    color: ${({ theme }) => theme.COLORS.RED_600};
    line-height: 28px;
  `}
`

export const Description = styled.Text`
  margin-top: 16px;
  
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.LG}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BODY_REGULAR};
    color: ${({ theme }) => theme.COLORS.RED_800};
    line-height: 23px;
  `}
`

export const Value = styled.Text`
${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${({ theme }) => theme.FONT_FAMILY.BODY_BOLD};
    color: ${({ theme }) => theme.COLORS.RED_800};
    line-height: 23px;
  `}
`

export const Market = styled.Text`
  margin-top: 32px;

  ${({ theme }) => css`
      font-size: ${theme.FONT_SIZE.XXL}px;
      font-family: ${({ theme }) => theme.FONT_FAMILY.TITLE_BOLD};
      color: ${({ theme }) => theme.COLORS.RED_800};
    `}
`