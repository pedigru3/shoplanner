import AsyncStorage from "@react-native-async-storage/async-storage";
import { SHOPPING_LIST_COLLECTION } from "@storage/storageConfig";

export async function getShoppingListId() {
  try {
    const storaged = await AsyncStorage.getItem(SHOPPING_LIST_COLLECTION);
    if (storaged){
      return JSON.parse(storaged)
    } else {
      return null
    }
  } catch (error) {
    throw error
  }
}