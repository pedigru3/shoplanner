import { getShoppingListId } from "@storage/shoppingList/getShoppingListId";
import { saveShoppingListId } from "@storage/shoppingList/saveShoppingListId";
import { ReactNode, createContext, useEffect, useState } from "react";

type ShoppingListContextDataProps = {
  id: string
  saveId: (id: string) => Promise<void>
  isLoading: boolean
}

type ShoppingListContextProviderProps = {
  children: ReactNode
}

export const ShoppingListContext = createContext<ShoppingListContextDataProps>({} as ShoppingListContextDataProps)

export function ShoppingListContextProvider({ children }: ShoppingListContextProviderProps){
  const [id, setId] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  async function saveId(id: string){
    setId(id)
    await saveShoppingListId(id)
  }

  async function getId(){
    const id = await getShoppingListId()
    setId(id)
    setIsLoading(false)
  }

  useEffect(() => {
    getId()
  }, [])
  
  return (
  <ShoppingListContext.Provider value={
    {id, saveId, isLoading}
  }>
    {children}
  </ShoppingListContext.Provider>
  )
}