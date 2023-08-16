import styled from 'styled-components/native';
import theme from '../../theme';
import { ActivityIndicator } from 'react-native';

type LoadingPropsStyle = {
  type: 'PRIMARY' |  'SECONDARY'
}

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const LoadingIndicator = styled(ActivityIndicator).attrs<LoadingPropsStyle>(({type}) => ({
  size: 24
}))``