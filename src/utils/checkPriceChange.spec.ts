import { createShoppingListItem } from "@repositories/createShoppingListItem";
import { checkPriceChange } from "./checkPriceChange"
import { realmSchema } from "@libs/realm"
import { createShoppingList } from "@repositories/createShoppingList";
import { updatePrice } from "@repositories/updatePrice";
import Realm from "realm";

describe('Utils: CheckPriceChange', () => {

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
  
  it('shold be able to check price change', () => {
    realm.write(()=> {
      const mufato = createShoppingList({
        marketName: 'Mufato',
        realm,
        shoppingListName: 'Mufato',
        userId: 'user'
      })
      const feijaoMufato = createShoppingListItem({
        itemName: 'feijão',
        realm,
        shoppingList: mufato
      })

      updatePrice({
        realm,
        shoppingListItem: feijaoMufato,
        value: 3
      })

      updatePrice({
        realm,
        shoppingListItem: feijaoMufato,
        value: 4
      })

      expect(checkPriceChange({currentPrice: 3, shoppingListItem: feijaoMufato}).message).toBe('Novo preço adicionado')

      const big = createShoppingList({
        marketName: 'Mufato',
        realm,
        shoppingListName: 'Mufato',
        userId: 'user'
      })
      const feijaoBig = createShoppingListItem({
        itemName: 'Feijão ',
        realm,
        shoppingList: big
      })

      updatePrice({
        realm,
        shoppingListItem: feijaoBig,
        value: 4
      })

      expect(checkPriceChange({currentPrice: 4, shoppingListItem: feijaoBig}).message)
      .toBe('Mesmo preço da última compra')

      updatePrice({
        realm,
        shoppingListItem: feijaoBig,
        value: 8
      })
      
      expect(checkPriceChange({currentPrice: 8, shoppingListItem: feijaoBig}).type)
      .toBe('error')

      updatePrice({
        realm,
        shoppingListItem: feijaoBig,
        value: 3
      })
      
      expect(checkPriceChange({currentPrice: 3, shoppingListItem: feijaoBig}).type)
      .toBe('success')
    })
  
  })
})