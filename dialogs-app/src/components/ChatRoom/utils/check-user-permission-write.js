export const checkUserPermissionWrite = ({ users, currentUser }) => {
	return users.find(
		({ userId, permission }) =>
			userId === currentUser?.uid &&
			(permission === 'WRITE' || permission === 'ADMIN'),
	)
		? true
		: false;
};
