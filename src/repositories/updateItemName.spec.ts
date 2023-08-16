import { Item } from "@libs/realm/schemas/Item";
import { createItem } from "./createItem";
import { Realm } from "@realm/react";
import { realmSchema } from "@libs/realm";
import { createShoppingListItem } from "./createShoppingListItem";
import { createShoppingList } from "./createShoppingList";
import { updateItemName } from "./updateItemName";
import { updatePrice } from "./updatePrice";


describe('Repositories: UpdateItemName', ()=> {

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

  
  it('shold be able update item name and update new prices', () => {
    realm.write(() => {
      const shoppingList = createShoppingList({
        marketName: 'Mufato',
        realm,
        userId: 'userId',
        shoppingListName: 'Minha lista de compra'
      })

      const shoppingList2 = createShoppingList({
        marketName: 'Mufato',
        realm,
        userId: 'userId',
        shoppingListName: 'Minha segunda lista de compra'
      })
 
     const shoppingListItem = createShoppingListItem({
       itemName: 'Feijão',
       realm,
       shoppingList
     })

     updatePrice({
      realm,
      shoppingListItem,
      value: 9
     })

     const shoppingListItem2 = createShoppingListItem({
      itemName: 'Feijão',
      realm,
      shoppingList: shoppingList2
    })

    updatePrice({
      realm,
      shoppingListItem: shoppingListItem2,
      value: 10
     })


    expect(shoppingListItem.item.prices).toHaveLength(2)

    updateItemName({
      realm,
      itemName: 'ARROZ',
      shoppingListItem
    })
     
     expect(shoppingListItem.item.name).toBe('ARROZ')
     expect(shoppingListItem.item.prices).toHaveLength(1)
     expect(realm.objects<Item>('Item')).toHaveLength(2)

     expect(realm.objects<Item>('Item').filtered("name = 'ARROZ'")[0].prices).toHaveLength(1)
     expect(realm.objects<Item>('Item').filtered("name = 'FEIJÃO'")[0].prices).toHaveLength(1)
     expect(realm.objects<Item>('Item').filtered("name = 'FEIJÃO'")[0].prices[0].value).toBe(10)

     expect(shoppingListItem.price?.value).toBe(9)
    })
   })
})