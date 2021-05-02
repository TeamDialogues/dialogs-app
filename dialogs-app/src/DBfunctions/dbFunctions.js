import React, { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "firebase/firestore";
import "firebase/auth";
import firebase from "../config/firebaseConfig";
const firestore = firebase.firestore();

export function getChats(chatId) {
  chatId = "EVk1hONn8Mi4Q1LHjnpl";

  //TODO: Optimise datamodel (good to have)
  const messagesRef = firestore.collection("chatrooms");

  const query = messagesRef;

  return query;
}

export function getUsersQuery() {
  const usersRef = firestore.collection("users");
  return usersRef;
}

export function getMessageQueryFromChatId(chatId) {
  //TODO: Optimise datamodel (good to have)
  const messagesRef = firestore.collection("messages");

  const query = messagesRef
    .where("chatRoomId", "==", chatId)
    .orderBy("createdAt");

  return query;
}

export async function addUserToChat(newUser) {
  newUser = {
    userId: "123",
    permission: "READ",
    userName: "random",
    userImage: "https://material-ui.com/static/images/avatar/1.jpg",
    createdAt: new Date().toISOString(),
    chatId: "fmwUYD6SU31ZPPf4F08z",
  };
  const usersRef = firestore.collection("users");

  const chatResponse = await usersRef.add(newUser);
}

export async function setPermissionForUserForChat(
  userId,
  chatId,
  permissonToBeGiven
) {
  const usersRef = firestore
    .collection("users")
    .where("userId", "==", userId)
    .where("chatId", "==", chatId)
    .get();

  if ((await usersRef).docs.length != 0) {
    const docId = (await usersRef).docs[0].id;

    firestore.collection("users").doc(docId).update({
      permission: permissonToBeGiven,
    });
  }
}

export function closeChat(chatId, isSaved) {
  chatId = "3VP4ZAzpsnmw3MxYajqT";
  if (isSaved) {
    firestore.collection("chatrooms").doc(chatId).update({
      currentStatus: "saved",
    });
  } else {
    firestore.collection("chatrooms").doc(chatId).update({
      currentStatus: "discarded",
    });
  }
}

export function makeChatPublic(chatId) {
  firestore.collection("chatrooms").doc(chatId).update({
    currentStatus: "public",
  });
}

export async function sendMessage(userMessageDetails) {
  //   userMessageDetails = {
  //     userId: "111",
  //     userName: "Pooja",
  //     text: "Testing backend",
  //     avatar: "https://material-ui.com/static/images/avatar/1.jpg",
  //     chatRoomId: "GXavhxw7uD3UKuJZAZAJ",
  //     createdAt: new Date().toISOString(),
  //   };
  const messagesRef = firestore.collection("messages");
  await messagesRef.add(userMessageDetails);
}
