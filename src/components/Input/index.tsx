import React, { forwardRef } from 'react';
import { TextInputProps } from 'react-native'
import { Container } from './styles';
import { useTheme } from 'styled-components';
import { TextInput } from 'react-native-gesture-handler';


type Props = TextInputProps 

export const Input = forwardRef<TextInput, Props>(( {...rest}, ref ) => {
  const { COLORS } = useTheme()

  return (
    <Container 
      ref={ref}
      placeholderTextColor={COLORS.GRAY_600}
      {...rest}/>
  );
})