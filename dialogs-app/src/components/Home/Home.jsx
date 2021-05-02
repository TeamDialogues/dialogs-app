import { useState } from "react";
import { Link } from "react-router-dom";
import { getChats } from "../../DBfunctions/dbFunctions";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthentication } from "../../context";
import { Modal } from "./Modal";
import { ChatRoomCard } from "./ChatRoomCard";
import { Navbar } from "../navbar/Navbar";
import "./home.css";

export const Home = () => {
  const { authStates } = useAuthentication();
  const [showModal, setShowModal] = useState(false);
  console.log({ authStates });
  const modalHandler = () => {
    setShowModal((prev) => !prev);
  };
  const chatQuery = getChats();
  const [chats] = useCollectionData(chatQuery, { idField: "id" });
  return (
    <>
      <Navbar />
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
          {chats &&
            chats.map((chatRoom) => {
              return (
                <Link key={chatRoom.id} to="/">
                  <ChatRoomCard chatRoom={chatRoom} />
                </Link>
              );
            })}
        </div>
        {showModal && (
          <Modal showModal={showModal} setShowModal={setShowModal} />
        )}
        <div className="flex-center">
          <button
            className="btn btn-square btn-floating"
            onClick={modalHandler}
          >
            + Create New Room
          </button>
        </div>
      </div>
    </>
  );
};
