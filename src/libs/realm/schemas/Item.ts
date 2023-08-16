import { Realm } from '@realm/react'
import { Price } from './Price'

type GenerateProps = {
  name: string
}

export class Item extends Realm.Object<Item> {
  name!: string
  prices!: Realm.List<Price>
  created_at!: Date
  updated_at!: Date

  static generate({ name } : GenerateProps){
    return {
      name: name.toUpperCase(),
      prices: [],
      created_at: new Date(),
      updated_at: new Date()
    }
  }

  static schema = {
    name: 'Item',
    properties: {
      name: {
        type: 'string',
        indexed: true
      },
      prices: 'Price[]',
      created_at: 'date',
      updated_at: 'date'
    },
    primaryKey: 'name',
  }
}