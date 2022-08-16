import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../asseets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";
import './cart-icons.styles.scss';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  // @ts-ignore
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return(
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  )
}

export default CartIcon;
