import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContexts";
import { signOutUser } from "../utils/firebase";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  // console.log(currentUser);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  return (
    <>
      <div className=" d-flex justify-content-between">
        <h2>I am the Nav</h2>
        {currentUser ? (
          <span className="" onClick={signOutHandler}>
            Sign Out
          </span>
        ) : (
          <Link className=" text-decoration-none text-dark" to="signIn">
            Sign in
          </Link>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
