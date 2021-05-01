import React, { useState } from "react";
import "./login.css";
import { useAuthState } from "react-firebase-hooks/auth";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import firebase, { auth, provider } from "../firebase/firebaseconfig";
import "firebase/firestore";

const firestore = firebase.firestore();

import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  input: {
    marginBottom: "1.5rem",
    width: "100%",
  },
}));

export const Login = () => {
  const classes = useStyles();
  const [user] = useAuthState(auth);
  const { authDispatch } = useAuth();
  const [userObject] = useState({
    name: "sruthi",
    email: "sruthiragupathy@gmail.com",
    password: "abcdef",
  });
  //   const [error, setError] = useState("");

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(provider);
    const userObject = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
    if (user) {
      authDispatch({ type: "SET_CURRENTUSER", payload: userObject });
      authDispatch({ type: "TOGGLE_LOGIN_STATE" });
    }
  };

  const createUserWithEmailandPassword = async (e) => {
    e.preventDefault();
    const { name, email, password } = userObject;
    console.log(userObject);
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log({ user });
      console.log("hi till this point");
      //   console.log( });
      const userRef = await firestore.collection("users");
      const response = await userRef.add({
        name,
        email,
        password,
      });
      console.log("here");
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  };

  //   const signInWithEmailAndPasswordHandler = (event, email, password) => {
  //     event.preventDefault();
  //     auth.signInWithEmailAndPassword(email, password).catch((error) => {
  //       setError("Error signing in with password and email!");
  //       console.error("Error signing in with password and email", error);
  //     });
  //   };

  return (
    <div className="login-container">
      <div className="landing-theme">
        <div className="dialogs-logo">dialogs</div>
        <div className="landing-theme__txt">
          Discover some of the most interesting debates happening around
        </div>
      </div>
      <div className="login-wrapper">
        <div className="dialogs-logo desktop-view">dialogs</div>
        <div className="border-bottom padding-bottom">
          <h2>Sign in to Dialogs</h2>
          <button className="btn-primary" onClick={signInWithGoogle}>
            Sign In With Google
          </button>
        </div>
        <form className="form flex-center-column">
          <TextField
            id="outlined-basic"
            label="Username or Email Address"
            variant="outlined"
            className={classes.input}
          />
          <TextField
            id="outlined-basic"
            label="password"
            variant="outlined"
            className={classes.input}
          />
          <button
            className="btn-primary margin-bottom"
            onClick={(e) => {
              console.log("hi");
              createUserWithEmailandPassword(
                e,
                userObject.email,
                userObject.password
              );
            }}
          >
            Sign In
          </button>
          <div className="">
            Not a member?{" "}
            <Link to="/signup" className="bold-txt">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
