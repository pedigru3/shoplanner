import { ShoppingList } from "@libs/realm/schemas/ShoppingList";
import { Realm } from "@realm/react";
import { createShoppingListItem } from "./createShoppingListItem";
import { createShoppingList } from "./createShoppingList";
import { realmSchema } from "@libs/realm";


describe('Repositories: CreateShoppingListItem', ()=> {

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

  it('shold be able create a shoppinglistItem', () => {
    realm.write(()=> {
      const shoppingList = createShoppingList({
        realm,
        marketName: 'Mufato',
        shoppingListName: 'Minha lista',
        userId: 'user_felipe'
      })

      const shoppingListItem = createShoppingListItem({
        itemName: 'Feijão',
        realm,
        shoppingList: shoppingList as ShoppingList,
      })

      expect(shoppingListItem.item.name).toBe('FEIJÃO') 

    })
  })

  it('shold be not able to create a shoppinglistItem with same name', () => {
    realm.write(()=> {
      const shoppingList = createShoppingList({
        realm,
        marketName: 'Mufato',
        shoppingListName: 'Minha lista',
        userId: 'user_felipe'
      })

      createShoppingListItem({
        itemName: 'Feijão',
        realm,
        shoppingList: shoppingList as ShoppingList,
      })

      expect(() => createShoppingListItem({
        itemName: 'Feijão',
        realm,
        shoppingList: shoppingList as ShoppingList,
      })).toThrow('Item already Exists')

    })
  })

})