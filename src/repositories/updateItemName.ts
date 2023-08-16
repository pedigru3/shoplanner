import { ShoppingListItem } from "@libs/realm/schemas/ShoppingListItem"
import { createItem } from "./createItem"
import { updatePrice } from "./updatePrice"

type Props = {
  realm: Realm
  shoppingListItem: ShoppingListItem
  itemName: string
}

export function updateItemName({realm, shoppingListItem, itemName}: Props){
  const newItem = createItem({
    realm,
    itemName,
  })

  const value = shoppingListItem.price?.value

  if(shoppingListItem.price?._id){
    const indexToRemove = shoppingListItem.item.prices.findIndex(item => item._id === shoppingListItem.price?._id)
    if (indexToRemove !== -1) {
      shoppingListItem.item.prices.splice(indexToRemove, 1);
      console.log(shoppingListItem.item.prices)
  }
    realm.delete(shoppingListItem.price)
  }

  shoppingListItem.item = newItem

  if (value){
    updatePrice({
      realm,
      shoppingListItem,
      value
    })
  }
  
}