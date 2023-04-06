import { useState, useContext } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../utils/firebase";
import { UserContext } from "../contexts/UserContexts";
import InputForm from "./InputForm";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formField, setFormField] = useState(defaultFormFields);
  const { email, password } = formField;

  const { setCurrentUser } = useContext(UserContext);

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const resetFormField = () => {
    setFormField(defaultFormFields);
  };

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setFormField({ ...formField, [name]: value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
      resetFormField();
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("incorrect password");
          break;

        case "auth/user-not-found":
          alert("couldn't find an email");
          break;

        default:
          console.error(err.message);
          break;
      }
      resetFormField();
      console.error(err.message);
    }
  };

  return (
    <>
      <h1>Already have an account?</h1>
      <span>Sign in with email and password</span>
      <form action="" className="my-width" onSubmit={handlerSubmit}>
        <div className=" form-floating mt-3 mb-3">
          <InputForm
            type="email"
            className=" form-control"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handlerChange}
            label="Email"
          />
        </div>
        <div className=" form-floating mb-3">
          <InputForm
            type="password"
            className=" form-control"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handlerChange}
            label="Password"
          />
        </div>

        <div className=" d-flex justify-content-between">
          <button className=" text-capitalize btn btn-outline-dark px-3">
            Sign In
          </button>
          <button
            type="button"
            onClick={signInWithGoogle}
            className=" text-capitalize btn btn-primary"
          >
            Sign in with google
          </button>
        </div>
      </form>
    </>
  );
};

export default SignInForm;
