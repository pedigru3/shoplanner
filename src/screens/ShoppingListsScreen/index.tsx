import React from 'react';
import { Container, Hello, Name } from './styles';
import { Item as ItemComponent } from '../../components/Item';
import { FlatList, HStack, VStack } from 'native-base';
import { useQuery, useRealm } from '../../libs/realm';
import { ShoppingList } from '../../libs/realm/schemas/ShoppingList';
import { PhotoUser } from '@components/PhotoUser';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { Alert } from 'react-native';
import { useShoppingList } from '@hooks/useShoppingList';
import { useUser } from '@realm/react';

export function ShoppingListsScreen() {
  const {id:shoppingListId, saveId} = useShoppingList()
  const user = useUser()

  const shoppingLists = useQuery(ShoppingList).filtered('user_id = $0', user.id)

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  const realm = useRealm()

  function handleNewList(){
    navigation.navigate('CreateShoppingListsScreen')
  }

  async function handleOpenShoppingList(shoppingList: ShoppingList){
    if (!shoppingList.shopping_list_items  || shoppingList.shopping_list_items.length === 0){
      navigation.navigate('AddNewItems', { id: shoppingList._id })
    } else {
      try {
        await saveId(shoppingList._id)
        navigation.navigate('Home')
      } catch (error) {
        console.log(error)
        Alert.alert('Item', 'Erro ao salvar ID')
      }
    }
  }

  async function handleDeleteShoppingList(shoppingList: ShoppingList){
    try {
      const deletedId = shoppingList._id
      realm.write(() => {
        realm.delete(shoppingList)
      })
      if (shoppingListId.toString() === deletedId.toString()){
        if (shoppingLists[0]?._id){
          await saveId(shoppingLists[0]._id)
        } else {
          await saveId('')
        }
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Minhas compras', 'Erro ao deletar lista de compras')
    }
  }

  return (
    <Container>
      <HStack mb={8}>
          <VStack>
            <Hello>Minhas</Hello>
            <Name>Compras</Name>
          </VStack>
          <PhotoUser/>
        </HStack>

      <FlatList
      showsVerticalScrollIndicator={false}
        data={shoppingLists} 
        renderItem={({item}) => (
          <ItemComponent 
            name={item.name}
            onRemoved={() => handleDeleteShoppingList(item)}
            onPress={() => handleOpenShoppingList(item)}
          />
      )} 
      />

      <Button
        title='Nova Lista +'
        onPress={handleNewList}
      />
         
    </Container>
  );
}