import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
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

export const Body = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XL}px;
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

