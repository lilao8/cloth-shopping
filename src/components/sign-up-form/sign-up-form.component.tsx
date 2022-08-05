import { useState } from "react";
import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import "./sign-up-form.styles.scss";


const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const resetFormFields = () =>{
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password not matching.");
      return;
    }

    try {
      // @ts-ignore
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error:any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create because email already in use.");
      } else {
        console.log(error);
      }
    }
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]:value });
  };


  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          inputOptions = {{
            type: 'text',
            required: true,
            onChange: handleChange,
            name: 'displayName',
            value: displayName,
          }}
          />
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
        <FormInput
          label="Confirm Password"
          inputOptions = {{
            type: 'password',
            required: true,
            onChange: handleChange,
            name: 'Confirm Password',
            value: confirmPassword,
          }}
        />
        <Button buttonType="sign-up">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
