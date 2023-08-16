import MaskInputReact from 'react-native-mask-input';
import styled from 'styled-components/native';

export const Input = styled(MaskInputReact)`
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