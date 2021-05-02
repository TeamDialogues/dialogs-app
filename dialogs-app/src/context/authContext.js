import { useReducer, createContext, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

// import { useAuthState } from "react-firebase-hooks/auth";
const authContext = createContext();

const authReducer = (auth, { type, payload }) => {
  switch (type) {
    case "SET_CURRENTUSER":
      return { ...auth, currentUser: payload };
    case "TOGGLE_LOGIN_STATE":
      return { ...auth, isLoggedIn: payload ? payload : !auth.isLoggedIn };
  }
};

export const AuthProvider = ({ children }) => {
  const [authStates, authDispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    currentUser: null,
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userCredentials = JSON.parse(
      localStorage?.getItem("userCredentials")
    );

    userCredentials?.isLoggedIn &&
      authDispatch({
        type: "TOGGLE_LOGIN_STATE",
        payload: userCredentials.isLoggedIn,
      });
    userCredentials?.currentUser &&
      authDispatch({
        type: "SET_CURRENTUSER",
        payload: userCredentials.currentUser,
      });
    if (userCredentials?.isLoggedIn) {
      navigate(location.pathname);
    }
  }, []);
  return (
    <authContext.Provider value={{ authStates, authDispatch }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
