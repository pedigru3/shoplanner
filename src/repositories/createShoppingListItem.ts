import { Item } from "@libs/realm/schemas/Item"
import { ShoppingList } from "@libs/realm/schemas/ShoppingList"
import { ShoppingListItem } from "@libs/realm/schemas/ShoppingListItem"
import { createItem } from "./createItem"

type Props = {
  realm: Realm
  shoppingList: ShoppingList
  itemName: string
}

export function createShoppingListItem({itemName, realm, shoppingList}: Props): ShoppingListItem{
  const item = createItem({
    itemName,
    realm,
  })

  const shoppingListItemAlreadyExists = shoppingList.shopping_list_items?.filtered('item.name = $0', itemName.toUpperCase())[0]
  if(shoppingListItemAlreadyExists){
    throw Error('Item already Exists')
  } else {
    const shoppingListItem = realm.create('ShoppingListItem', ShoppingListItem.generate({
      item,
      quantity: 1,
    }))
  
    shoppingList.shopping_list_items?.push(shoppingListItem as ShoppingListItem)
  
    return shoppingListItem as ShoppingListItem
  }

  
}