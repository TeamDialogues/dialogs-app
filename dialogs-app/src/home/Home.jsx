import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Modal } from "../modal/Modal";
import { ChatRoomCard } from "./ChatRoomCard";
import "./home.css";
import { chatRooms } from "./mockdata";

export const Home = () => {
  const { authStates } = useAuth();
  const [showModal, setShowModal] = useState(false);
  console.log({ authStates });
  const modalHandler = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <div className="home-wrapper">
      {showModal && <div className="background-overlay"></div>}
      <h2 className="remove-margin margin-bottom">
        Hello{" "}
        {authStates?.currentUser?.displayName
          ? authStates.currentUser.displayName
          : "Sruthi"}
      </h2>
      <div className="lightgrey-txt margin-bottom">
        Join the debates going on currently!
      </div>
      <div className="grid-wrapper">
        {chatRooms.map((chatRoom) => {
          return (
            <Link key={chatRoom.id} to="/">
              <ChatRoomCard chatRoom={chatRoom} />
            </Link>
          );
        })}
      </div>
      {showModal && <Modal showModal={showModal} setShowModal={setShowModal} />}
      <div className="flex-center">
        <button className="btn btn-square btn-floating" onClick={modalHandler}>
          + Create New Room
        </button>
      </div>
    </div>
  );
};
