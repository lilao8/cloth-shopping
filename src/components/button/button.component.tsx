import  {BaseButton, GoogleSignInButton, InvertedButton, ButtonSpinner } from "./button.styles";

export const BUTTON_TYPE_CLASSES:any = {
  base: 'base',
  google: 'google-authentication',
  inverted: 'inverted',
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    // @ts-ignore
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType])


const Button = ({ children, buttonType, isLoading, ...otherProps }:any) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner/> : children}
    </CustomButton>
  );
};

export default Button;
