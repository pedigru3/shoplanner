import React, { useContext, useState } from 'react';
import { Body, Container, Space, Title } from './styles';
import { Input } from '../../components/Input';
import { Item as ItemComponent } from '../../components/Item';
import { FlatList } from 'native-base';
import { Alert } from 'react-native';
import { Button } from '../../components/Button';
import { useRealm, useQuery, useObject } from '../../libs/realm';
import {  useNavigation, useRoute } from '@react-navigation/native';
import { ShoppingList } from '@libs/realm/schemas/ShoppingList';
import { Item } from '@libs/realm/schemas/Item';
import { ShoppingListItem } from '@libs/realm/schemas/ShoppingListItem';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { createItem } from '../../repositories/createItem';
import { ShoppingListContext } from '../../context/ShoppingListContext';

type RouteParamsProps = {
  id: string
}

export function AddNewItems() {
  const route = useRoute()
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const { saveId } = useContext(ShoppingListContext)

  const [itemName, setItemName] = useState('')
  const [items, setItems] = useState<Item[]>([])
  const [isCreatingList, setIsCreatingList] = useState(false)

  const { id } = route.params as RouteParamsProps
  const storagedItems = useQuery(Item)

  const shoppingList = useObject(ShoppingList, id)

  const realm = useRealm()

  function handleNewItem(){
    if (itemName === ''){
      return
    }

    if (items.filter((item)=> item.name === itemName.toUpperCase()).length > 0){
      return Alert.alert('Novo item', 'Item já adicionado')
    }    
    
      try {
        realm.write(() => {
          const newItem = createItem({
            itemName,
            realm,
          })
          setItems(prevState => [...prevState, newItem])
        })
      } catch (error) {
        Alert.alert('Criar item', 'Erro na criação do item')
      }
    
    setItemName('')
  }

  function handleRemoveItem(item: Item){
    setItems(items.filter(i => i !== item))
  }

  function handleCreateList(){
    setIsCreatingList(true)

    if (!shoppingList?.shopping_list_items){
      return Alert.alert('Criar Lista', 'Erro! Lista não encontrada')
    }

    realm.write(() => {
      items.forEach((item) => {
        if (shoppingList.shopping_list_items!.filter((i) => i.item.name === item.name).length > 0){
          return 
        }
        const shoppingListItem = realm.create('ShoppingListItem', ShoppingListItem.generate({
          item,
          quantity: 1,
        }))
        shoppingList.shopping_list_items?.push(shoppingListItem as ShoppingListItem)
      })
    })
    saveId(shoppingList._id)
    setIsCreatingList(false)
    navigation.navigate('Home')
  }

  return (
    <Container>
      <Title>{shoppingList?.name}</Title>
      <Body>Qual item está faltando em casa?</Body>
      <Space/>

      <Input
          placeholder='Ex.: Arroz'
          onChangeText={(name) => setItemName(name)}
          onSubmitEditing={handleNewItem}
          value={itemName}
      />
      <Space/>

      <FlatList
      flexGrow={0}
      showsVerticalScrollIndicator={false}
        data={items} 
        renderItem={({item}) => (
          <ItemComponent 
            disabled={true}
            name={item.name}
            onRemoved={() => handleRemoveItem(item)}
          />
      )} 
      />

      {items.length > 0 && 
        <Button 
          type='SECONDARY'
          isLoading={isCreatingList}
          title={'Criar lista'}
          style={{
            marginTop: items.length > 7 ? 5 : 40
          }}
          onPress={handleCreateList}
        />}
    </Container>
  );
}