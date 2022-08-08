import { createContext, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
})

export const CartProvider = ({ children }:any) => {
  const[isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };
  // @ts-ignore
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
