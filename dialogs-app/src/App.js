import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "firebase/firestore";
import "firebase/auth";
import firebase from "./config/firebaseConfig";
import "./App.css";

const firestore = firebase.firestore();

function ChatRoom({ chatRoom }) {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");

  const query = messagesRef
    .where("chatRoomId", "==", chatRoom.id)
    .orderBy("createdAt");

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  async function sendMessage(e) {
    e.preventDefault();

    await messagesRef.add({
      userId: "123",
      userName: "Pooja",
      text: formValue,
      chatRoomId: chatRoom.id,
      createdAt: new Date().toISOString(),
    });

    setFormValue("");

    dummy.current.scrollIntoView({ behaviour: "smooth" });
  }

  async function discardChat() {
    const chatRoomsRef = firestore.collection("chatrooms").doc(chatRoom.id);

    await chatRoomsRef.update({ currentStatus: "unsaved" });
  }

  async function saveChat() {
    const chatRoomsRef = firestore.collection("chatrooms").doc(chatRoom.id);

    await chatRoomsRef.update({ currentStatus: "saved" });
  }

  return (
    <>
      <h4>{chatRoom.title}</h4>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={dummy}></div>
      </main>

      {chatRoom.currentStatus === "ongoing" ? (
        <div>
          <form onSubmit={sendMessage}>
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
          <button onClick={saveChat}>save chat</button>
          <button onClick={discardChat}>discard chat</button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

function ChatMessage({ message }) {
  return (
    <div>
      <img src={message.photoURL} />
      <p>{message.text}</p>
    </div>
  );
}

function App() {
  const chatRoomsRef = firestore.collection("chatrooms");
  const query = chatRoomsRef.orderBy("createdAt");
  const [showForm, setShowForm] = useState(false);

  const [chatRooms] = useCollectionData(query, { idField: "id" });
  const [formDetails, setFormDetails] = useState({ title: "", agenda: "" });

  async function createRoom() {
    console.log("here");
    const newRoom = {
      userId: "123",
      userName: "Pooja",
      title: formDetails.title,
      agenda: formDetails.agenda,
      currentStatus: "ongoing", //has to be made ENUM
      createdAt: new Date().toISOString(),
    };
    console.log(newRoom);

    await chatRoomsRef.add(newRoom);
  }

  function newRoomForm() {
    return (
      <div>
        <label>Title </label>
        <input
          type="text"
          onChange={(e) =>
            setFormDetails((formDetails) => ({
              ...formDetails,
              title: e.target.value,
            }))
          }
        ></input>

        <label> Agenda </label>
        <input
          type="text"
          onChange={(e) =>
            setFormDetails((formDetails) => ({
              ...formDetails,
              agenda: e.target.value,
            }))
          }
        ></input>
        <button onClick={createRoom}>Submit</button>
      </div>
    );
  }

  return (
    <div className="App">
      <button onClick={() => setShowForm(true)}>Create Room</button>
      {showForm && newRoomForm()}
      <br />
      <h3>On going chats</h3>
      {chatRooms &&
        chatRooms
          .filter((room) => room.currentStatus === "ongoing")
          .map((room) => <ChatRoom key={room.id} chatRoom={room} />)}
      <hr />
      <h3>Saved Chats</h3>
      {chatRooms &&
        chatRooms
          .filter((room) => room.currentStatus === "saved")
          .map((room) => <ChatRoom key={room.id} chatRoom={room} />)}
    </div>
  );
}

export default App;
