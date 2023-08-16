import React from 'react';
import { Input } from './styles';
import { Masks } from 'react-native-mask-input';

import { MaskInputProps } from 'react-native-mask-input';

export function MaskInput({...rest}: MaskInputProps) {

  return (
    <Input
      mask={Masks.BRL_CURRENCY}
      {...rest}
    />
  );
}