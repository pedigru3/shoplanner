import { Text } from 'native-base';
import React from 'react';
import { FlatList } from 'react-native';

export function Suggestions() {
  return (
    <FlatList
    style={{height: 100, position: 'absolute', width: '100%', paddingHorizontal: 32}}
    contentContainerStyle={{alignItems: 'center', backgroundColor: 'red'}}
    data={['op1', 'op2']}
    renderItem={({ item }) => (
      <Text>{item}</Text>
    )}
    >
    </FlatList>
  );
}