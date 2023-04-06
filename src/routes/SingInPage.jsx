import React from "react";

import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";

const SingInPage = () => {


  return (
    <div>
      <h1>I am sign In page</h1>
      <div className=" row justify-content-center">
        <div className="col-5">
          <SignInForm />
        </div>
        <div className="col-5">
          <SignUpForm />
        </div>
      </div>
      {/* <button onClick={signInWithGoogle}>sign in with google</button> */}
    </div>
  );
};

export default SingInPage;
