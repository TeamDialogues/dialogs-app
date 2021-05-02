/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./login.css";
import { useAuthState } from "react-firebase-hooks/auth";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { auth, provider } from "../firebase/firebaseconfig";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  input: {
    width: "100%",
  },
}));

export const Login = () => {
  const classes = useStyles();
  const [user] = useAuthState(auth);
  const { authStates, authDispatch } = useAuth();
  const [userObject, setUserObject] = useState({
    email: "",
    password: "",
  });
  console.log({ authStates });
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const validateForm = () => {
    let isValidationSuccess = true;

    if (!userObject.email) {
      setValidationError((error) => ({
        ...error,
        email: "Please enter a valid email",
      }));
      isValidationSuccess = false;
    }
    if (!userObject.password) {
      setValidationError((error) => ({
        ...error,
        password: "Please enter a valid password",
      }));
      isValidationSuccess = false;
    }

    return isValidationSuccess;
  };

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(provider);
    const userObject = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
    if (user) {
      authDispatch({ type: "SET_CURRENTUSER", payload: userObject });
      authDispatch({ type: "TOGGLE_LOGIN_STATE" });
      navigate("/");
    }
  };

  const signInWithEmailAndPassword = async (e) => {
    e.preventDefault();
    setError("");
    setValidationError({ email: "", password: "" });

    if (validateForm()) {
      const { email, password } = userObject;
      try {
        const userResponse = await auth.signInWithEmailAndPassword(
          email,
          password
        );

        const currentUser = {
          uid: userResponse.user.uid,
          displayName: userResponse.user.displayName,
          email: userResponse.user.email,
        };

        authDispatch({ type: "SET_CURRENTUSER", payload: currentUser });
        authDispatch({ type: "TOGGLE_LOGIN_STATE" });
        setUserObject({
          email: "",
          password: "",
        });
      } catch (error) {
        setError(error.code);
      }
    }
  };

  const onChangeHandler = (e) => {
    setUserObject({ ...userObject, [e.target.name]: e.target.value });
  };
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
          <button className="btn-primary width-100" onClick={signInWithGoogle}>
            SIGN IN WITH GOOGLE
          </button>
        </div>
        <form
          className="form flex-center-column"
          onSubmit={signInWithEmailAndPassword}
        >
          {error && <div className="error-alert margin-bottom ">{error}</div>}
          <div className="field-container">
            <TextField
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              className={classes.input}
              value={userObject.email}
              name="email"
              onChange={onChangeHandler}
            />
            {validationError.email && (
              <small className="error-alert">*{validationError.email}</small>
            )}
          </div>
          <div className="field-container">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              className={classes.input}
              value={userObject.password}
              name="password"
              onChange={onChangeHandler}
            />
            {validationError.password && (
              <small className="error-alert">*{validationError.password}</small>
            )}
          </div>
          <button className="btn-primary margin-bottom" type="submit">
            LOGIN
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
