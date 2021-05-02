import firebase from "firebase/app";

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
