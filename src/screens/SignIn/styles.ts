import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding-right: 55px;
  padding-left: 55px;

  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Title = styled.Text`
  font-size: ${(props) => props.theme.FONT_SIZE.XXXL}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.TITLE_BOLD};
  color: ${({ theme }) => theme.COLORS.RED_600};

  text-align: center;
  margin-bottom: 24px;
`

export const Description = styled.Text`
  font-size: ${(props) => props.theme.FONT_SIZE.LG}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.TITLE_REGULAR};
  color: ${({ theme }) => theme.COLORS.RED_600};

  text-align: center;
  margin-top: 24px;
  margin-bottom: 24px;
`