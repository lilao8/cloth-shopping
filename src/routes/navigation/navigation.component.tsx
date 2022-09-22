import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import CartIcon from "../../components/cart-icon/cart-icons.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from "../../store/user/user.selector";
import { ReactComponent as ClothLogo } from "../../asseets/logo.svg";
import { NavigationContainer, NavLink, NavLinks, Logo } from "./navigation.styles";
import { signOutUser} from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen  = useSelector(selectIsCartOpen);
  return (
    <>
      <NavigationContainer>
        <Logo to="/">
          <ClothLogo className="logo" />
        </Logo>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutUser}>
                SIGN OUT
              </NavLink>
            ) : (
              <NavLink to="/auth">
                SIGN IN
              </NavLink>
            )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
