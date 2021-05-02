import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Navbar } from "../navbar/Navbar";
import { ChatRoomCard } from "./ChatRoomCard";
import { useState } from "react";
import { Modal } from "../modal/Modal";
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
    <>
      <Navbar />
      {showModal && <div className="background-overlay"></div>}
      <div className="home-wrapper">
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
          {chatRooms.length ? (
            chatRooms.map((chatRoom) => {
              return (
                <Link key={chatRoom.id} to="/">
                  <ChatRoomCard chatRoom={chatRoom} />
                </Link>
              );
            })
          ) : (
            <div>No live Debates happening</div>
          )}
        </div>
      </div>
      {showModal && <Modal showModal={showModal} setShowModal={setShowModal} />}
      <div className="flex-center">
        <button className="btn btn-square btn-floating" onClick={modalHandler}>
          + Create New Room
        </button>
      </div>
    </>
  );
};
