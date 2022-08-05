import { useState } from "react";
import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";


const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields;

  console.log(formFields);

  const resetFormFields = () =>{
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
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

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]:value });
  };


  return (
    <div className="sign-in-container">
      <h2>Already has an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions = {{
            type: 'email',
            required: true,
            onChange: handleChange,
            name: 'email',
            value: email,
          }}
        />
        <FormInput
          label="Password"
          inputOptions = {{
            type: 'password',
            required: true,
            onChange: handleChange,
            name: 'Password',
            value: password,
          }}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google sign in</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
