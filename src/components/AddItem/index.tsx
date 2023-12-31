import React, { useRef, useState } from 'react';
import { Input } from '@components/Input';
import { IconButton } from '@components/IconButton';
import { Alert, Keyboard } from 'react-native';
import { useQuery, useRealm } from '@libs/realm';
import { createItem } from '../../repositories/createItem';
import { ShoppingListItem } from '@libs/realm/schemas/ShoppingListItem';
import { Item } from '@libs/realm/schemas/Item';
import { ShoppingList } from '@libs/realm/schemas/ShoppingList';

import { Container, HStack } from './styles';
import { TextInput } from 'react-native-gesture-handler';
import { SuggestionsInput } from '@components/SuggestionsInput';
import { View } from 'native-base';

type Props = {
  shoppingList: ShoppingList
}

export function AddItem({ shoppingList } : Props) {

  const realm = useRealm()

  function handleNewItem(itemName: string){
    if (itemName === ''){
      return Alert.alert('Novo item', 'Nome inválido')
    }
    if (shoppingList?.shopping_list_items){
      const searchItems = shoppingList.shopping_list_items.filtered("item.name = $0", itemName.toUpperCase())
      if (searchItems.length > 0){
        return Alert.alert('Novo item', 'Item já adicionado')
      }
      realm.write(() => {
        const item = createItem({
          itemName,
          realm,
        })
        const newShoppingListItem = realm.create('ShoppingListItem', ShoppingListItem.generate({
          item,
          quantity: 1,
        }))
        shoppingList.shopping_list_items!.push(newShoppingListItem as ShoppingListItem)
      })
      
    }
  }

  return (
    <Container>
      <HStack style={{height: 50, position:'relative'}}>
        <SuggestionsInput
          type='Item'
          placeHolder='Novo item: ex. Arroz'
          hasIcon
          onPressIcon={handleNewItem}
        />
      </HStack>
    </Container>
  );
}