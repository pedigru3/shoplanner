import { Item } from "@libs/realm/schemas/Item"

type Props = {
  realm: Realm
  itemName: string
}

export function createItem({realm, itemName}: Props): Item{
  const storagedItems = realm.objects<Item>('Item')
  const searchItems = storagedItems.filtered("name = $0", itemName.toUpperCase().trim())
  if (searchItems.length > 0){
    return searchItems[0]
  } else {
    const newItem = realm.create('Item', Item.generate({
      name: itemName.trim().toUpperCase()
    }))
    return newItem as Item
  }
}