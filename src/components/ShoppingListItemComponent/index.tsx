import React, { useRef, useState } from 'react';
import { Container, InputName, InputValues } from './styles';
import Swipeable from "react-native-gesture-handler/Swipeable"
import { IconButton } from '@components/IconButton';
import { Alert, Animated } from 'react-native';
import { ShoppingListItem } from '@libs/realm/schemas/ShoppingListItem';
import { useRealm } from '@libs/realm';
import { capitalizeFirstLetter } from '@utils/capitalizeFirstLetter';
import { MaskInput } from '@components/MaskInput';
import { parseBRLCurrent } from '@utils/parseBRLCurrent';
import { updatePrice } from '@repositories/updatePrice';
import { updateItemName } from '@repositories/updateItemName';

import Toast from 'react-native-toast-message';
import { CheckPriceChangeResult, checkPriceChange } from '@utils/checkPriceChange';


type Props = {
  shoppingListItem: ShoppingListItem
}

export function ShoppingListItemComponent({ shoppingListItem } : Props) {
  const realm = useRealm()

  const [name, setName] = useState(shoppingListItem.item.name)
  const price = useRef<number | undefined>()
  const [priceMasked, setPriceMasked] = useState(shoppingListItem.price?.value.toFixed(2))
  const [quantity, setQuantity] = useState(shoppingListItem.quantity.toString())

  function RigthActions(progress: Animated.AnimatedInterpolation<string | number>, dragX: Animated.AnimatedInterpolation<string | number>) {
    const scale = dragX.interpolate({
      inputRange: [-40, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    })

    function onRemoved(){
      try {
        realm.write(() => {
          realm.delete(shoppingListItem)
        })
      } catch (error) {
        Alert.alert('Remover item', 'Erro ao remover item')
      }
    }
    
    return (
      <Animated.View 
        style={
          { transform: [{ scale }],
            justifyContent: 'center',
            alignItems: 'center',
            }}>
        <IconButton
        style={{marginRight: 32}}
        iconName='delete'
        onPress={onRemoved}
        />
      </Animated.View>
    )
  }

  const showToast = ({message, type}: CheckPriceChangeResult) => {
      setTimeout(() => {
        Toast.hide()
        Toast.show({
          type,
          text1: message,
          position: 'bottom',
        }) 
      }, 500)
  }

  function handleNameUpdate(){
    if(name.trim().toUpperCase() === shoppingListItem.item.name){
      return
    }
    try {
      realm.write(()=> {
        updateItemName({
          realm,
          itemName: name,
          shoppingListItem
        })
      })
    } catch (error) {
      console.log(error)
      Alert.alert('Atualizar nome', 'Erro ao atualizar nome')
    }
    return 
  }

  function handlePriceUpdate(){
    if(!price.current){
      return
    }
    if(price.current === shoppingListItem.price?.value){
      return
    }
    try {
      realm.write(() => {
        updatePrice({
          realm,
          shoppingListItem,
          value: price.current!
        })
      })
    } catch (error) {
      console.log(error)
      Alert.alert('Atualizar preço', 'Erro ao atualizar preço')
    }
    return  showToast(checkPriceChange({ shoppingListItem, currentPrice: price.current }))
  }

  function handleQuantityUpdate(){
    try {
      realm.write(() => {
        shoppingListItem.quantity = Number(quantity)
      })
    } catch (error) {
      Alert.alert('Atualizar quantidade', 'Erro ao atualizar quantidade')
    } 
  }

  return (
    <Swipeable
      renderRightActions={RigthActions}
    >
      <Container>
        <InputName
        value={capitalizeFirstLetter(name)}
        onChangeText={setName}
        onSubmitEditing={handleNameUpdate}
        onBlur={handleNameUpdate}
        autoCorrect={false}
        />
        <InputValues
        returnKeyType='done'
        keyboardType='number-pad'
        value={quantity}
        onChangeText={setQuantity}
        onSubmitEditing={handleQuantityUpdate}
        onBlur={handleQuantityUpdate}
        />
        <MaskInput
        returnKeyType='done'
        value={priceMasked}
        onChangeText={(masked, unmasked) => {
          price.current = parseBRLCurrent(masked)
          setPriceMasked(unmasked)
        }}
        onSubmitEditing={handlePriceUpdate}
        onBlur={handlePriceUpdate}
        
        keyboardType='number-pad'
        />
      </Container>
    </Swipeable>
  );
}