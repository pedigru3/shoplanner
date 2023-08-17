import React, { useState } from 'react';
import { Container } from './styles';
import { HStack } from 'native-base';
import { Input } from '@components/Input';
import { IconButton } from '@components/IconButton';
import { Alert } from 'react-native';
import { useQuery, useRealm } from '@libs/realm';
import { createItem } from '../../repositories/createItem';
import { ShoppingListItem } from '@libs/realm/schemas/ShoppingListItem';
import { Item } from '@libs/realm/schemas/Item';
import { ShoppingList } from '@libs/realm/schemas/ShoppingList';

type Props = {
  shoppingList: ShoppingList
}

export function AddItem({ shoppingList } : Props) {
  const [itemName, setItemName] = useState('')

  const realm = useRealm()

  function handleNewItem(){
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
      <HStack >
        <Input 
          style={{marginBottom: 16}}
          placeholder='Novo item'
          onChangeText={setItemName}
          value={itemName}
        />
        <IconButton
          iconName='add'
          onPress={handleNewItem}
        />
      </HStack>
    </Container>
  );
}