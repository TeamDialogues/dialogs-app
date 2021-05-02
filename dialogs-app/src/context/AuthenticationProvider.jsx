import { useReducer, createContext, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { authenticationReducer } from './authentication-reducer';

// import { useAuthState } from "react-firebase-hooks/auth";
const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
	const [authStates, authDispatch] = useReducer(authenticationReducer, {
		isLoggedIn: false,
		currentUser: null,
	});
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const userCredentials = JSON.parse(
			localStorage?.getItem('userCredentials'),
		);

		userCredentials?.isLoggedIn &&
			authDispatch({
				type: 'TOGGLE_LOGIN_STATE',
				payload: userCredentials.isLoggedIn,
			});
		userCredentials?.currentUser &&
			authDispatch({
				type: 'SET_CURRENTUSER',
				payload: userCredentials.currentUser,
			});
		if (userCredentials?.isLoggedIn) {
			navigate(location.pathname);
		}
	}, []);
	return (
		<AuthenticationContext.Provider value={{ authStates, authDispatch }}>
			{children}
		</AuthenticationContext.Provider>
	);
};

export const useAuthentication = () => {
	return useContext(AuthenticationContext);
};
