import { ShoppingListItem } from "@libs/realm/schemas/ShoppingListItem"

type Props = {
  shoppingListItem: ShoppingListItem
  currentPrice: number
}

export type CheckPriceChangeResult = {
  type: 'success' | 'error' | 'info' 
  message: string
}

export function checkPriceChange({ shoppingListItem, currentPrice}:Props): CheckPriceChangeResult{
  const lastPrice = shoppingListItem.item.prices[shoppingListItem.item.prices.length-1]
  
  if(shoppingListItem.price?._id.toString() === lastPrice._id.toString()){
    return {
      type: 'info',
      message: `Novo preço adicionado`
    }
  }

  if(currentPrice > lastPrice.value){
    return {
      type: 'error',
      message: `R$ ${currentPrice - lastPrice.value} mais caro que a última compra`
    }
  }
  
  if(currentPrice < lastPrice.value){
    return {
      type: 'success',
      message: `R$ ${lastPrice.value - currentPrice} mais barato que a última compra`
    }
  }
  
  return {
    type: 'info',
    message: 'Mesmo preço da última compra'
  }
  
}