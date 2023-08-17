import React, { useState } from 'react';
import { Container, Space, Title } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useUser } from '@realm/react';
import { useRealm } from '../../libs/realm';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { Alert } from 'react-native';
import { createShoppingList } from '@repositories/createShoppingList';
import { BSON } from 'realm';

export function CreateShoppingListScreen() {
  const [isCreatingList, setIsCreatingList] = useState(false)
  const [shoppingListName, setShoppingListName] = useState('')
  const [marketName, setMarketName] = useState('')

  const user = useUser()
  const navigator = useNavigation<AppNavigatorRoutesProps>()

  const realm = useRealm()

  function handleCreateList(){
    setIsCreatingList(true)
    try {
      if (shoppingListName.length < 3 || marketName.length < 3){
        return Alert.alert('Criar lista', 'Nome inválido')
      }
      let id: string = ''
      realm.write(() => {
        console.log('i')
        const newShoppingList = createShoppingList({
          marketName,
          realm,
          shoppingListName,
          userId: user.id
        }) 
        id = newShoppingList._id
      })
      setShoppingListName('')
      if (id === ''){
        return
      }
      navigator.navigate('AddNewItems', { id })
    } catch (error) {
      console.log(error)
      Alert.alert('Criar lista', 'Erro ao criar lista')
    } finally {
      setIsCreatingList(false)
    }
  }

  return (
    <Container>
      <Title>Crie sua lista</Title>
      <Space/>

      <Input
          placeholder='Exemplo: Feira da semana'
          onChangeText={(name) => setShoppingListName(name)}
          value={shoppingListName}
      />
      <Space/>

      <Input
          placeholder='Nome do Mercado'
          onChangeText={(name) => setMarketName(name)}
          value={marketName}
      />
      
      {shoppingListName.length > 3 && marketName.length > 3 &&
        <Button 
          type='SECONDARY'
          title={'Criar lista'}
          style={{
            marginTop: 20
          }}
          isLoading={isCreatingList}
          onPress={handleCreateList}
        />}
    </Container>
  );
}