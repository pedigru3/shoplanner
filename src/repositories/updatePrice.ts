import { Price } from "@libs/realm/schemas/Price"
import { ShoppingListItem } from "@libs/realm/schemas/ShoppingListItem"

type Props = {
  realm: Realm
  shoppingListItem: ShoppingListItem
  value: number
}

export function updatePrice({realm, shoppingListItem, value}: Props): Price{
  const price = realm.create('Price', Price.generate({
    value,
  }))

  if(!shoppingListItem.price){
    shoppingListItem.item.prices.push(price as Price)
  } 

  shoppingListItem.price = price as Price

  return price as Price;
}