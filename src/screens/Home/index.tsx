import { HStack, VStack, View } from 'native-base';
import { PhotoUser } from '../../components/PhotoUser';
import { Container, Header, Hello, Name, Description, Value, Market } from './styles';
import { useUser } from '@realm/react';
import { ShoppingListItemComponent } from '@components/ShoppingListItemComponent';
import { useObject, useRealm } from '@libs/realm';
import { ShoppingList } from '@libs/realm/schemas/ShoppingList';
import { LoadingIndicator } from '@components/Loading/styles';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { AddItem } from '@components/AddItem';
import { useShoppingList } from '@hooks/useShoppingList';
import { BSON } from 'realm';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export function Home() {
  const user = useUser()

  const { id, isLoading } = useShoppingList()
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null)
  const realm = useRealm()

  function getTotal(shoppingList: ShoppingList){
    let sum:number = 0;
    shoppingList.shopping_list_items?.forEach((item) => {
       sum += (item.price?.value ?? 0) * item.quantity
    })
    return sum.toFixed(2);
  }

  async function getShoppingList(){
     if (id != ''){
      const result = realm.objects<ShoppingList>('ShoppingList').filtered('_id = $0', new BSON.UUID(id))[0]
      setShoppingList(result as ShoppingList)
     } else {
      setShoppingList(null)
     }
  }

  useEffect(() => {
    realm.addListener('change', ()=> getShoppingList())

    return () => realm.removeListener('change', getShoppingList)
  }, [])

  useEffect(() => {
      getShoppingList()
  }, [])


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
            removeClippedSubviews={false}
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            data={shoppingList.shopping_list_items}
            contentContainerStyle={{paddingBottom: 20}}
            style={{flex:1, marginTop: Platform.OS === 'android' ? 20 : 0}}
            keyExtractor={(item)=> item._id}
            extraHeight={200}
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