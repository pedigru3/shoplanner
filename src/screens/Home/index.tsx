import { HStack, VStack, View } from 'native-base';
import { PhotoUser } from '../../components/PhotoUser';
import { Container, Header, Hello, Name, Description, Value, Market } from './styles';
import { useUser } from '@realm/react';
import { ShoppingListItemComponent } from '@components/ShoppingListItemComponent';
import { useRealm } from '@libs/realm';
import { getShoppingListId } from '@storage/shoppingList/getShoppingListId';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';
import { ShoppingList } from '@libs/realm/schemas/ShoppingList';
import { LoadingIndicator } from '@components/Loading/styles';
import { BSON } from 'realm';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { AddItem } from '@components/AddItem';

export function Home() {
  const user = useUser()

  const currentId = useRef<string|null>(null)
  const realm = useRealm()

  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null)

  async function getId() {
    try {
      currentId.current = await getShoppingListId()
      const shop = realm.objects<ShoppingList>('ShoppingList').filtered("_id = $0", new BSON.UUID(currentId.current!))[0]
      setShoppingList(shop)
    } catch (error) {
      console.log(error)
      Alert.alert('Home', 'Erro ao buscar ID')
    }
  }

  function getTotal(shoppingList: ShoppingList){
    let sum:number = 0;
    shoppingList.shopping_list_items?.forEach((item) => {
       sum += item.price?.value ?? 0
    })
    return sum.toFixed(2);
  }

  useEffect(() => {
    realm.addListener('change', ()=> getId())

    return () => realm.removeListener('change', getId)
  }, [])


  useFocusEffect(
    useCallback(() => {
      getId()
    }, [])
  )


  return (
   
      shoppingList ? 
      <View flex={1}>
          <Container>
            <Header>
              <HStack>
                <VStack>
                  <Hello>Olá,</Hello>
                  <Name>{user?.profile.name}</Name>
                </VStack>
                <PhotoUser/>
              </HStack>
              <Description>
                <Description>
                Essa é sua lista de compras.
                Atualmente no valor de:
                </Description>
                <Value> R$: {getTotal(shoppingList)}</Value>
              </Description>
            </Header>
            <Market>{shoppingList.name}</Market>
          </Container>
          
          <KeyboardAwareFlatList
            enableOnAndroid
            showsVerticalScrollIndicator={false}
            data={shoppingList.shopping_list_items}
            style={{flex:1}}
            keyExtractor={(item)=> item._id}
            extraHeight={100}
            extraScrollHeight={20}
            renderItem={({item}) => (
                <ShoppingListItemComponent
                shoppingListItem={item}
              />

            )}
            ItemSeparatorComponent={() => <View mt={2}/>}
            ListFooterComponent={()=> (
              <AddItem shoppingList={shoppingList}/>
            )}
          />
      </View>
      :
      <LoadingIndicator/>
    
      

  );
}