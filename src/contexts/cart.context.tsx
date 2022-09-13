import { createContext, useReducer } from "react";
import { createAction } from '../utils/reducer/reducer.util';

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
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const INITIAL_STATE = {
  cartTotal : 0,
  cartCount: 0,
  cartItems: [],
  isCartOpen: false,
};

const cartReducer = (state:any, action:any) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }
    default:
      throw new Error(`Unhandeled type of ${type} in cartReducer.`)
  }
}

export const CartProvider = ({ children }:any) => {

  const [{cartItems, cartCount, cartTotal, isCartOpen }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems:any) => {
    const newCartCount = newCartItems.reduce((total:any, cartItem:any) =>
      total + cartItem.quantity, 0
    );

    const newCartTotal = newCartItems.reduce((total:any, cartItem:any) =>
      total + cartItem.quantity * cartItem.price, 0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      }));
  };

  const addItemToCart = (productToAdd:any) => {
    // @ts-ignore
    const newCartItems = addCartItem(cartItems, productToAdd);
    // @ts-ignore
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove:any) => {
    // @ts-ignore
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    // @ts-ignore
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear:any) => {
    // @ts-ignore
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    // @ts-ignore
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (isCartOpen:boolean) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, {
      isCartOpen
    }));
  };

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
