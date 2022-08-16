import { useContext } from "react";
import Button from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";
import './product-card.styles.scss';

const ProudctCard = ({ product }:any) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);
  // @ts-ignore
  const addProductToCart = () => addItemToCart(product);
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`}/>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType='inverted' onClick={addProductToCart}>Add to cart</Button>
    </div>
  )
}

export default ProudctCard;
