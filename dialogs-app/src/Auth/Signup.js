/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./login.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { makeStyles } from "@material-ui/core/styles";
import { auth, provider } from "../firebase/firebaseconfig";
import { useAuth } from "../context/authContext";
import { Link, Navigate } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { isValidEmail, isValidPassword } from "../utils/utils";

const useStyles = makeStyles(() => ({
  input: {
    width: "100%",
  },
}));

export const Signup = () => {
  const classes = useStyles();
  const [user] = useAuthState(auth);
  const { authDispatch } = useAuth();
  const [userObject, setUserObject] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValidationSuccess = true;
    if (!userObject.name) {
      setValidationError((error) => ({
        ...error,
        name: "Please enter a valid username",
      }));
      isValidationSuccess = false;
    }
    if (!userObject.email || !isValidEmail(userObject.email)) {
      setValidationError((error) => ({
        ...error,
        email: "Please enter a valid email",
      }));
      isValidationSuccess = false;
    }
    if (!userObject.password || !isValidPassword(userObject.password)) {
      setValidationError((error) => ({
        ...error,
        password: "Please enter a valid password",
      }));
      isValidationSuccess = false;
    }
    return isValidationSuccess;
  };

  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(provider);
      const userObject = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      await localStorage.setItem(
        "userCredentials",
        JSON.stringify({
          isLoggedIn: true,
          currentUser: userObject,
        })
      );
      authDispatch({ type: "SET_CURRENTUSER", payload: userObject });
      authDispatch({ type: "TOGGLE_LOGIN_STATE", payload: true });
      Navigate("/");
    } catch (error) {
      setError("Signin not successful");
    }
  };

  const createUserWithEmailAndPassword = async (e) => {
    e.preventDefault();
    setError("");
    setValidationError({ name: "", email: "", password: "" });
    if (validateForm()) {
      const { name, email, password } = userObject;

      try {
        const userResponse = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await userResponse.user.updateProfile({
          displayName: name,
        });
        const newUser = {
          uid: userResponse.user.uid,
          displayName: userResponse.user.displayName,
          email: userResponse.user.email,
        };
        await localStorage.setItem(
          "userCredentials",
          JSON.stringify({
            isLoggedIn: true,
            currentUser: newUser,
          })
        );
        authDispatch({ type: "SET_CURRENTUSER", payload: newUser });
        authDispatch({ type: "TOGGLE_LOGIN_STATE", payload: true });
        setUserObject({
          name: "",
          email: "",
          password: "",
        });
        Navigate("/");
      } catch (error) {
        console.log({ error });
        setError(`${error.code}, Login to enter`);
      }
    } else {
      return;
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
          <h2>Sign up to Dialogs</h2>
          <button className="btn-primary width-100" onClick={signInWithGoogle}>
            Sign In With Google
          </button>
        </div>
        <form
          className="form flex-center-column"
          onSubmit={createUserWithEmailAndPassword}
        >
          {error && <div className="error-alert margin-bottom ">{error}</div>}
          <div className="field-container">
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              className={classes.input}
              value={userObject.name}
              name="name"
              onChange={onChangeHandler}
            />
            {validationError.name && (
              <small className="error-alert">*{validationError.name}</small>
            )}
          </div>
          <div className="field-container">
            <TextField
              id="outlined-basic"
              label="Username or Email Address"
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
              label="password"
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
            CREATE ACCOUNT
          </button>

          <div className="">
            Already a member?{" "}
            <Link to="/login" className="bold-txt">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
