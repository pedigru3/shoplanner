import { Realm } from '@realm/react'
import { BSON } from 'realm'

type GenerateProps = {
  value: number
}

export class Price extends Realm.Object<Price> {
  _id!: string
  value!: number
  created_at!: Date
  updated_at!: Date

  static generate({ value } : GenerateProps){
    return {
      _id: new Realm.BSON.UUID(),
      value,
      created_at: new Date(),
      updated_at: new Date()
    }
  }

  static schema = {
    name: 'Price',
    properties: {
      _id: 'uuid',
      value: 'double',
      created_at: 'date',
      updated_at: 'date'
    },
    primaryKey: '_id',
  }
}