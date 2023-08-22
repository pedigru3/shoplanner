import { createRealmContext } from '@realm/react'
import { ShoppingList } from './schemas/ShoppingList'
import { ShoppingListItem } from './schemas/ShoppingListItem'
import { Price } from './schemas/Price'
import { Item } from './schemas/Item'
import { Market } from './schemas/Market'

export const realmSchema = [ShoppingList, ShoppingListItem, Item, Price, Market]

export const {
  RealmProvider,
  useObject,
  useQuery,
  useRealm
} = createRealmContext({
  schema: realmSchema,
  schemaVersion: 4
})

