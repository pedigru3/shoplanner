import React from 'react';
import { Container } from './styles';
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps &{
  iconName: keyof typeof MaterialIcons.glyphMap
}

export function IconButton({iconName, ...rest}: Props) {
  const { COLORS } = useTheme()

  return (
    <Container {...rest}>
      <MaterialIcons 
        name={iconName}
        size={30}
        color={COLORS.RED_500}
      />
    </Container>
  );
}