import React from "react";
import { Outlet, Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <div className=" d-flex justify-content-between">
        <h2>I am the Nav</h2>
        <Link className=" text-decoration-none text-dark" to="signIn">
          Sign in
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
