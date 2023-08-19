import { Market } from "@libs/realm/schemas/Market"
import { ShoppingList } from "@libs/realm/schemas/ShoppingList"

type Props = {
  realm: Realm
  shoppingListName: string
  marketName: string
  userId: string
}

export function createShoppingList({realm, shoppingListName, marketName, userId}: Props): ShoppingList{
  let market: Market

  const marketAlreadyExists = realm.objects<Market>('Market').filtered("name = $0", marketName.toUpperCase())[0]

  if (marketAlreadyExists){
    market = marketAlreadyExists
  } else {
    market = realm.create<Market>('Market', Market.generate({
      name: marketName.trim().toUpperCase()
    }))
  }

  const shoppingList = realm.create('ShoppingList', ShoppingList.generate({
    name: shoppingListName.trim(),
    market: market,
    user_id: userId,
  }))

  return shoppingList as ShoppingList
}