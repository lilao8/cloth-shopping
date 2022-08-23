import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {ShoppingIcon, CartIconConatiner, ItemCount} from "./cart-icons.styles";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  // @ts-ignore
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return(
    <CartIconConatiner onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconConatiner>
  )
}

export default CartIcon;
