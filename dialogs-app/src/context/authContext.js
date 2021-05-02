import { useReducer, createContext, useContext } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
const authContext = createContext();

const authReducer = (auth, { type, payload }) => {
  switch (type) {
    case "SET_CURRENTUSER":
      return { ...auth, currentUser: payload };
    case "TOGGLE_LOGIN_STATE":
      return { ...auth, isLoggedIn: !auth.isLoggedIn };
  }
};

export const AuthProvider = ({ children }) => {
  const [authStates, authDispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    currentUser: null,
  });
  return (
    <authContext.Provider value={{ authStates, authDispatch }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
