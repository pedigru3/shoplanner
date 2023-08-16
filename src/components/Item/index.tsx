import React from 'react';
import { Container, ItemName, Presseble } from './styles';
import { Trash, Horse } from 'phosphor-react-native';
import { useTheme } from 'styled-components';
import { TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  name: string
  onRemoved: () => void
}

export function Item({ name, onRemoved, ...rest } : Props) {
  const { COLORS } = useTheme()

  return (
    <Container {...rest}>
      <ItemName numberOfLines={1}>{ name }</ItemName>
      <Presseble onPress={onRemoved}>
        <Trash color={COLORS.WHITE}/>
      </Presseble>
    </Container>
  );
}