export const authenticationReducer = (auth, { type, payload }) => {
	switch (type) {
		case 'SET_CURRENTUSER':
			return { ...auth, currentUser: payload };
		case 'TOGGLE_LOGIN_STATE':
			return { ...auth, isLoggedIn: payload ? payload : !auth.isLoggedIn };
	}
};
