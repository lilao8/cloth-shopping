import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../../components/form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../../components/button/button.component";

import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields;

  const resetFormFields = () =>{
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>)  => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error:any) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email.");
          break
        case "auth/user-not-found":
          alert("No uer associated with this email.");
          break
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]:value });
  };


  return (
    <div className="sign-in-container">
      <h2>Already has an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={(e) => handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />
        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
