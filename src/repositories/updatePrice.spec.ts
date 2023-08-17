import { Realm } from "@realm/react";
import { realmSchema } from "@libs/realm";
import { createShoppingList } from "./createShoppingList";
import { createShoppingListItem } from "./createShoppingListItem";
import { updatePrice } from "./updatePrice";

describe('Repositories: UpdatePrice', ()=> {

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

  it('shold be able update a price corretaly', () => {
   realm.write(() => {
    const shoppingList = createShoppingList({
      marketName: 'Mufato',
      realm,
      shoppingListName: 'Minha lista de compras',
      userId: 'user-felipe'
    })

    const shoppingListItem = createShoppingListItem({
      itemName: 'Feijão',
      realm,
      shoppingList
    })

    updatePrice({
      realm,
      shoppingListItem,
      value: 3
    })

    updatePrice({
      realm,
      shoppingListItem,
      value: 3.50
    })

    expect(shoppingListItem.price?.value).toBe(3.5)
    expect(shoppingListItem.item.prices).toHaveLength(1)
   })
  })

  it('shold be able see prices historic', () => {
    realm.write(() => {
     const shoppingList = createShoppingList({
       realm,
       marketName: 'Mufato',
       shoppingListName: 'Minha lista de compras',
       userId: 'user-felipe'
     })

     const shoppingList2 = createShoppingList({
      realm,
      marketName: 'Mufato',
      shoppingListName: 'Minha lista de compras',
      userId: 'user-felipe'
    })
 
     const shoppingListItem = createShoppingListItem({
       itemName: 'Feijão',
       realm,
       shoppingList
     })

     const shoppingListItem2 = createShoppingListItem({
      itemName: 'Feijão',
      realm,
      shoppingList: shoppingList2
    })
 
     updatePrice({
       realm,
       shoppingListItem,
       value: 3
     })
 
     updatePrice({
       realm,
       shoppingListItem: shoppingListItem2,
       value: 3.50
     })
 
     expect(shoppingListItem.price?.value).toBe(3)
     expect(shoppingListItem2.price?.value).toBe(3.5)
     expect(shoppingListItem.item.prices).toHaveLength(2)
    })
   })

   it('shold be keep one price', () => {
    realm.write(() => {
      const shoppingList = createShoppingList({
        realm,
        marketName: 'Mufato',
        shoppingListName: 'Minha lista de compras',
        userId: 'user-felipe'
      })

      const shoppingListItem = createShoppingListItem({
        itemName: 'Macarrão',
        realm,
        shoppingList
      })

      updatePrice({
        realm,
        shoppingListItem,
        value: 3
      })

      updatePrice({
        realm,
        shoppingListItem,
        value: 4
      })

      updatePrice({
        realm,
        shoppingListItem,
        value: 5
      })

      expect(shoppingListItem.item.prices).toHaveLength(1)
      expect(shoppingListItem.item.prices[0].value).toBe(5)
    })
   })

})