import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "firebase/firestore";
import "firebase/auth";
import firebase from "../config/firebaseConfig";
const firestore = firebase.firestore();

export function getChatFromId(chatId) {
  chatId = "EVk1hONn8Mi4Q1LHjnpl";

  //   const chatRoomsRef = await firestore
  //     .collection("chatrooms")
  //     .doc(chatId)
  //     .get();
  //    setChatData(chatRoomsRef.data());
  // console.log(chatRoomsRef.data());

  //TODO: Optimise datamodel (good to have)
  const messagesRef = firestore.collection("chatrooms");

  const query = messagesRef;

  return query;
}

export function getMessageQueryFromChatId(chatId) {
  chatId = "EVk1hONn8Mi4Q1LHjnpl";

  //TODO: Optimise datamodel (good to have)
  const messagesRef = firestore.collection("messages");

  const query = messagesRef
    .where("chatRoomId", "==", chatId)
    .orderBy("createdAt");

  return query;
}

//TODO: FIX THIS!
export async function addUserToChat(newUser, chatId) {
  newUser = {
    userId: "123",
    permission: "READ",
    userName: "random",
    userImage: "https://material-ui.com/static/images/avatar/1.jpg",
  };

  const response = await firestore
    .collection("chatrooms")
    .doc(chatId)
    .get("users");

  console.log(response.data());
  //   const response = await firestore
  //     .collection("chatrooms")
  //     .doc(chatId)
  //     .set({ users: [{ user }] }, { merge: true });
}

export function setPermissionForUserForChat(user, permissonToBeGiven) {}

export function closeChat(chatId, isSaved) {}

export function makeChatPublic(chatId) {}

// export async function sendMessage(messageFromUser) {
//     e.preventDefault();

//     await messagesRef.add({
//       userId: currentLoggedInUserId,
//       userName: currentLoggedInUserName,
//       text: textMessage,
//       avatar: "https://material-ui.com/static/images/avatar/1.jpg",
//       chatRoomId: chatRoom.id,
//       createdAt: new Date().toISOString(),
//     });

//     setTextMessage("");

//     dummy.current.scrollIntoView({ behaviour: "smooth" });
//   }
