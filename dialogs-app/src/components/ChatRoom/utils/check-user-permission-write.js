export const checkUserPermissionWrite = ({ users, currentUser, chatId }) => {
	const allChatUsers = users.filter((user) => user.chatId === chatId);

	return allChatUsers.find(
		({ userId, permission }) =>
			userId === currentUser.uid &&
			(permission === 'WRITE' || permission === 'ADMIN'),
	);
};
