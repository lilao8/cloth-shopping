import "./button.styles.scss";

const BUTTON_TYPE_CLASSES:any = {
  google: 'google-authentication',
  inverted: 'inverted',
};

const Button = ({ children, buttonType, ...otherProps }:any) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
