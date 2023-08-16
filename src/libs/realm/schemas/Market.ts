import { Realm } from '@realm/react'

type GenerateProps = {
  name: string
}

export class Market extends Realm.Object<Market> {
  name!: string
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
    name: 'Market',
    properties: {
      name: {
        type: 'string',
        indexed: true
      },
      created_at: 'date',
      updated_at: 'date'
    },
    primaryKey: 'name',
  }
}