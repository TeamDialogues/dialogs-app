import React from "react";
import "./login.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  input: {
    marginBottom: "1.5rem",
    width: "100%",
  },
}));

export const Login = () => {
  const classes = useStyles();
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
          <button className="btn-primary">Sign In With Google</button>
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
          <button className="btn-primary">Sign In</button>
        </form>
      </div>
    </div>
  );
};
