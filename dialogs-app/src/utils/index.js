export const isValidEmail = (email) => {
	const emailRegex = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
	return emailRegex.test(email);
};

export const isValidPassword = (password) => {
	const passwordRegex = new RegExp('[0-9]+');
	return password.length > 6 && passwordRegex.test(password);
	// return false
};

export const convertISODateToDate = (ISODate) => {
	const dateTime = ISODate.split('T');
	return {
		date: dateTime[0],
		time: dateTime[1].slice(0, 8),
	};
};
