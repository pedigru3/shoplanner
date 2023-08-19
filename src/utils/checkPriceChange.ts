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
  
  if(shoppingListItem.item.prices.length <= 1){
    return {
      type: 'info',
      message: `Novo preço adicionado`
    }
  }

  const lastPrice = shoppingListItem.item.prices[shoppingListItem.item.prices.length-2]

  if(currentPrice > lastPrice.value){
    return {
      type: 'error',
      message: `R$ ${(currentPrice - lastPrice.value).toFixed(2)} mais caro que a última compra`
    }
  }
  
  if(currentPrice < lastPrice.value){
    return {
      type: 'success',
      message: `R$ ${(lastPrice.value - currentPrice).toFixed(2)} mais barato que a última compra`
    }
  }
  
  return {
    type: 'info',
    message: 'Mesmo preço da última compra'
  }
  
}