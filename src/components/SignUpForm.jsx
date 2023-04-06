import { useState, useContext } from "react";
import {
  createUserAuthWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../utils/firebase";
import { UserContext } from "../contexts/UserContexts";
import InputForm from "./InputForm";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formField, setFormField] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formField;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormField = () => {
    setFormField(defaultFormFields);
  };

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setFormField({ ...formField, [name]: value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords are not match");
      return;
    }

    try {
      const { user } = await createUserAuthWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormField();
    } catch (err) {
      if (err.code === "auth/email-already-in-use")
        alert("email already in use");
      resetFormField();
      console.error(err.message);
    }
  };

  return (
    <>
      <h1>Don't have an account?</h1>
      <span>Sign up with email and password</span>
      <form action="" className="my-width" onSubmit={handlerSubmit}>
        <div className=" form-floating mb-3 mt-3">
          <InputForm
            type="text"
            className=" form-control"
            placeholder="Username"
            name="displayName"
            value={displayName}
            label={"Username"}
            onChange={handlerChange}
          />
        </div>
        <div className=" form-floating mb-3">
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
        <div className=" form-floating mb-3">
          <InputForm
            type="password"
            className=" form-control"
            placeholder="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handlerChange}
            label={"Confirm Password"}
          />
        </div>
        <button className=" btn btn-outline-dark px-3">Sign UP</button>
      </form>
    </>
  );
};

export default SignUpForm;
