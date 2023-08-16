import { Realm } from '@realm/react'
import { ShoppingListItem } from './ShoppingListItem'
import { Market } from './Market'

type GenerateProps = {
  user_id: string
  name: string
  market: Market
  shopping_list_items?: Realm.List<ShoppingListItem>;
}

export class ShoppingList extends Realm.Object<ShoppingList> {
  _id!: string
  user_id!: string
  name!: string
  market!: Market
  shopping_list_items?: Realm.List<ShoppingListItem>;
  created_at!: Date
  updated_at!: Date

  static generate({name, user_id, shopping_list_items, market} : GenerateProps){
    return {
      _id: new Realm.BSON.UUID(),
      name, 
      market,
      user_id,
      shopping_list_items: shopping_list_items,
      created_at: new Date(),
      updated_at: new Date()
    }
  }

  static schema = {
    name: 'ShoppingList',
    primaryKey: '_id',

    properties: {
      _id: 'uuid',
      user_id: {
        type: 'string',
        indexed: true
      },
      market: 'Market',
      shopping_list_items: 'ShoppingListItem[]',
      name: 'string',
      created_at: 'date',
      updated_at: 'date'
    }
  }
}

