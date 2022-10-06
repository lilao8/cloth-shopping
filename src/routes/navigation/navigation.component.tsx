import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartIcon from "../../components/cart-icon/cart-icons.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";
import { ReactComponent as ClothLogo } from "../../asseets/logo.svg";
import { NavigationContainer, NavLink, NavLinks, Logo } from "./navigation.styles";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen  = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());

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
