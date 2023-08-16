import { useTheme } from 'styled-components/native';
import {Container, LoadingIndicator } from './styles';

type LoadingProps = {
  type?: 'PRIMARY' |  'SECONDARY'
}

export function Loading({ type='PRIMARY' } : LoadingProps) {
  const {COLORS} = useTheme()
  return (
    <Container>
      <LoadingIndicator testID='activity-indicator' color={type === 'PRIMARY' ? COLORS.RED_500 : COLORS.WHITE}/>
    </Container>
  );
}