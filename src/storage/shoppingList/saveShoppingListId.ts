import AsyncStorage from "@react-native-async-storage/async-storage";
import { SHOPPING_LIST_COLLECTION } from "@storage/storageConfig";

export async function saveShoppingListId(id:string) {
  try {
    await AsyncStorage.setItem(SHOPPING_LIST_COLLECTION, JSON.stringify(id));
  } catch (error) {
    throw error
  }
}