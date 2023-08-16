import { Realm } from '@realm/react'
import { Price } from './Price'
import { Item } from './Item'

type GenerateProps = {
  quantity: number
  item: Item
  price?: Price
  id?: string
}

export class ShoppingListItem extends Realm.Object<ShoppingListItem> {
  _id!: string
  quantity!: number
  price?: Price
  item!: Item
  created_at!: Date
  updated_at!: Date

  static generate({ quantity, item, price, id } : GenerateProps) {
    return {
      _id: id ? id : new Realm.BSON.UUID(),
      quantity, 
      item,
      price,
      created_at: new Date(),
      updated_at: new Date()
    }
  }

  static schema = {
    name: 'ShoppingListItem',
    properties: {
      _id: 'uuid',
      quantity: 'double',
      item: 'Item',
      price: 'Price?',
      created_at: 'date',
      updated_at: 'date'
    },
    primaryKey: '_id',
  }
}