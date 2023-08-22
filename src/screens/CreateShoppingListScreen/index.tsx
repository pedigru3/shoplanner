import React, { useEffect, useRef, useState } from 'react';
import { Container, Space, Title } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useUser } from '@realm/react';
import { useRealm } from '../../libs/realm';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { Alert, Keyboard } from 'react-native';
import { createShoppingList } from '@repositories/createShoppingList';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View } from 'native-base';
import { TextInput } from 'react-native-gesture-handler';

import { TouchableWithoutFeedback } from 'react-native';
import { SuggestionsInput } from '@components/SuggestionsInput';

export function CreateShoppingListScreen() {
  const [isCreatingList, setIsCreatingList] = useState(false)
  const [shoppingListName, setShoppingListName] = useState('')
  const [marketName, setMarketName] = useState('')

  const [inputFocused, setInputFocused] = useState(false);
  const shoppingListNameRef = useRef<TextInput>(null)
  const marketNameRef = useRef<TextInput>(null)

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
      console.log(id)
      navigator.navigate('AddNewItems', { id })
    } catch (error) {
      console.log(error)
      Alert.alert('Criar lista', 'Erro ao criar lista')
    } finally {
      setIsCreatingList(false)
    }
  }

  function handleBlur(){
    setInputFocused(false)
    Keyboard.dismiss()
  }


  return (
    <TouchableWithoutFeedback onPress={handleBlur}>
    <Container>
      <Title>Crie sua lista</Title>
      <Space/>

      <Input
          ref={shoppingListNameRef}
          onFocus={() => setInputFocused(true)}
          placeholder='Exemplo: Feira da semana'
          onChangeText={(name) => setShoppingListName(name)}
          value={shoppingListName}
          onSubmitEditing={()=> marketNameRef.current?.focus()}
      />
      
      <Space/>

      <View marginBottom={12}>
        <SuggestionsInput
          placeHolder='Nome do mercado'
          type='Market'
          onBlur={setMarketName}
        />
      </View>
     
      
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

        {
          inputFocused ?
          <View h={48} />
          :
          <View/>
        }
    </Container>
    </TouchableWithoutFeedback>
  );
}