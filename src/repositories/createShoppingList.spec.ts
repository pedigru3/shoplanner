import { Item } from "@libs/realm/schemas/Item";
import { Price } from "@libs/realm/schemas/Price";
import { ShoppingList } from "@libs/realm/schemas/ShoppingList";
import { ShoppingListItem } from "@libs/realm/schemas/ShoppingListItem";
import { Realm } from "@realm/react";
import { createShoppingListItem } from "./createShoppingListItem";
import { Market } from "@libs/realm/schemas/Market";
import { createShoppingList } from "./createShoppingList";
import { realmSchema } from "@libs/realm";


describe('Repositories: CreateShoppingList', ()=> {

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


  it('shold be able to create two shopping lists', () => {
    realm.write(()=> {
      const shoppingList1 = createShoppingList({
        realm,
        marketName: 'Mufato',
        shoppingListName: 'Minha primeira lista',
        userId: 'user_felipe'
      })

      const shoppingList2 = createShoppingList({
        realm,
        marketName: 'Mufato',
        shoppingListName: 'Minha segunda lista',
        userId: 'user_felipe'
      })

      expect(shoppingList1.name).toBe('Minha primeira lista')
      expect(shoppingList1.market.name).toBe('MUFATO')
      expect(shoppingList2.name).toBe('Minha segunda lista')
      expect(shoppingList2.market.name).toBe('MUFATO')
      expect(realm.objects<Market>('Market')).toHaveLength(1)
    })
  })

})