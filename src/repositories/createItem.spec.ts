import { Item } from "@libs/realm/schemas/Item";
import { createItem } from "./createItem";
import { Realm } from "@realm/react";
import { realmSchema } from "@libs/realm";


describe('Repositories: CreateItem', ()=> {

  let realm: Realm;

  const config: Realm.Configuration = {
    schema: realmSchema,
  }

  beforeEach(async () => {
    realm = await Realm.open(config);
  });

  afterEach(() => {
    if (!realm.isClosed) {
      realm.close();
    }
    if (config) {
      Realm.deleteFile(config);
    }
  });

  it('shold be create a item or get this item if already exists', () => {
   realm.write(() => {
    const item1 = createItem({
      itemName: 'FEIJÃO',
      realm
    })

    const item2 = createItem({
      itemName: 'FEIJÃO',
      realm
    })

    expect(item1.name).toBe(item2.name)
    expect(realm.objects<Item>('Item').length).toBe(1)
   })
  })

  it('shold be able create a item ignoring case sensitive', () => {
    realm.write(() => {
     const item1 = createItem({
       itemName: 'feiJão',
       realm
     })
 
     const item2 = createItem({
       itemName: 'FEIJÃO',
       realm
     })
 
     expect(item1.name).toBe(item2.name)
     expect(realm.objects<Item>('Item').length).toBe(1)
    })
   })
})