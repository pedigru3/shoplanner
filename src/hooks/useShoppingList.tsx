import { useContext } from "react";

import { ShoppingListContext } from "../context/ShoppingListContext";

export function useShoppingList(){
  const context = useContext(ShoppingListContext)

  return context
}