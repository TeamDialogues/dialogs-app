import firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyC0ngUAoq9Q1dPL6-GU8vMofQI-Ka4j3Mg",
  authDomain: "neog-hack211.firebaseapp.com",
  projectId: "neog-hack211",
  storageBucket: "neog-hack211.appspot.com",
  messagingSenderId: "1042486466270",
  appId: "1:1042486466270:web:b33413a8602d27e64b944f",
  measurementId: "G-3QCS9EVNCK",
};

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
