import React from 'react';
import { TextInputProps } from 'react-native'
import { Container } from './styles';
import { useTheme } from 'styled-components';


type Props = TextInputProps 

export function Input({...rest} : Props) {
  const { COLORS } = useTheme()

  return (
    <Container 
      placeholderTextColor={COLORS.GRAY_600}
      {...rest}/>
  );
}