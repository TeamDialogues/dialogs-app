export const sortUsers = ({ users, currentUser, chatId }) => {
	if (users && users.length !== 0) {
		const allChatUsers = users.filter((user) => user.chatId === chatId);

		const currentUserInfoFromChat = allChatUsers.find(
			({ id }) => id === currentUser?.uid,
		);
		const hostOfTheChat = allChatUsers.find(
			({ permission }) => permission === 'ADMIN',
		);

		const isCurrentUserAdmin = true;

		const activeUsers = allChatUsers.filter(
			({ id, permission }) => id !== currentUser?.uid && permission === 'WRITE',
		);
		const guestUsers = allChatUsers.filter(
			({ id, permission }) => id !== currentUser?.uid && permission === 'READ',
		);
		const requestedUsers = allChatUsers.filter(
			({ id, permission }) =>
				id !== currentUser?.uid && permission === 'REQUEST',
		);

		const sortedUsers = isCurrentUserAdmin
			? [hostOfTheChat, ...requestedUsers, ...activeUsers, ...guestUsers]
			: [
					hostOfTheChat,
					currentUserInfoFromChat,
					...requestedUsers,
					...activeUsers,
					...guestUsers,
			  ];

		return { sortedUsers, isCurrentUserAdmin, hostOfTheChat };
	}

	return { sortedUsers: [], isCurrentUserAdmin: [], hostOfTheChat: [] };
};
