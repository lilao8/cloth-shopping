import { createContext, useEffect, useState } from "react";

// @ts-ignore
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem:any)=> cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem:any) => cartItem.id === productToAdd.id
      ? {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem);
  }

  return [...cartItems, {...productToAdd, quantity: 1}]
};

// @ts-ignore
const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem:any)=> cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem:any) => cartItem.id !== cartItemToRemove.id)
  }

  return cartItems.map((cartItem:any) => cartItem.id === cartItemToRemove.id
    ? {...cartItem, quantity: cartItem.quantity - 1}
    : cartItem);
}

// @ts-ignore
const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem:any) => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
})

export const CartProvider = ({ children }:any) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItem] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(()=> {
    // @ts-ignore
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  },[cartItems]);

  useEffect(()=> {
    // @ts-ignore
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    setCartTotal(newCartTotal);
  },[cartItems]);


  const addItemToCart = (productToAdd:any) => {
    // @ts-ignore
    setCartItem(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove:any) => {
    // @ts-ignore
    setCartItem(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear:any) => {
    // @ts-ignore
    setCartItem(clearCartItem(cartItems, cartItemToClear));
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal
  };
  // @ts-ignore
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
