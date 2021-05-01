import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyC-Zk-DTODDxTvfYcu3ulGDqBPveGHCjMU",
  authDomain: "neog-hack21.firebaseapp.com",
  databaseURL: "https://neog-hack21-default-rtdb.firebaseio.com",
  projectId: "neog-hack21",
  storageBucket: "neog-hack21.appspot.com",
  messagingSenderId: "961674827592",
  appId: "1:961674827592:web:c3884e2f1f21d1882f857d",
};

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const provider = new firebase.auth.GoogleAuthProvider();

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) {
    return;
  }
  console.log({ user, additionalData });
  firestore.db.collections;
  const userRef = firestore.collection("users").doc(`${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, name, photoUrl } = user;
    try {
      await userRef.set({
        email,
        name,
        photoUrl,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
