import "./navbar.css";
// import { Modal } from "../modal/Modal";
// import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router";

export const Navbar = () => {
  //   const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  //   const modalHandler = () => {
  //     setShowModal((prev) => !prev);
  //   };

  const { authDispatch } = useAuth();

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
          {/* <button
            className="btn btn-square btn-floating"
            onClick={modalHandler}
          >
            + Create New Room
          </button> */}
          <button className="btn btn-logout" onClick={logoutHandler}>
            LOGOUT
          </button>
        </div>
      </nav>
      {/* {showModal && <Modal showModal={showModal} setShowModal={setShowModal} />} */}
    </>
  );
};
