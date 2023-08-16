import styled from 'styled-components/native';

export const Container = styled.View`
  height: 39px;

  flex-direction: row;
  gap: 10px;
  margin-right: 32px;
  margin-left: 32px;
`

export const InputName = styled.TextInput`
  flex: 2;

  border-radius: 16px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.RED_500};

  padding-left: 16px;

  background-color: ${({theme}) => theme.COLORS.WHITE};
`

export const InputValues = styled.TextInput`
  flex: 1;

  border-radius: 16px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.RED_500};

  padding-left: 8px;
  padding-right: 8px;

  justify-content: center;
  text-align: center;

  background-color: ${({theme}) => theme.COLORS.WHITE};
`