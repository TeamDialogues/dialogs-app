import "./navbar.css";
import { useNavigate } from "react-router";
import { useAuthentication } from "../../context";

export const Navbar = () => {
  const navigate = useNavigate();

  const { authDispatch } = useAuthentication();

  const logoutHandler = async () => {
    await localStorage?.removeItem("userCredentials");
    authDispatch({ type: "TOGGLE_LOGIN_STATE", payload: false });
    authDispatch({ type: "SET_CURRENTUSER", payload: {} });
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar flex">
        <div className="left dialogs-logo">dialogs</div>
        <div className="right">
          <button className="btn btn-logout" onClick={logoutHandler}>
            LOGOUT
          </button>
        </div>
      </nav>
    </>
  );
};
