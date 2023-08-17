import styled from 'styled-components/native';

export const Container = styled.View`
  height: 60px;
  width: 100%;

  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
`;