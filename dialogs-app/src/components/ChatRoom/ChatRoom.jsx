import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './chat-room.css';

import {
	addUserToChat,
	getChats,
	getMessageQueryFromChatId,
	getUsersQuery,
} from '../../DBfunctions/dbFunctions';
import { ChatRoomMessagesContainer } from './ChatRoomMessagesContainer';
import { ChatRoomUsersContainer } from './ChatRoomUsersContainer';
import { currentUser } from '../../temp-database';

const chatId = 'GXavhxw7uD3UKuJZAZAJ';

export function ChatRoom({ state }) {
	const messagesQuery = getMessageQueryFromChatId(chatId);

	const [messages] = useCollectionData(messagesQuery, { idField: 'id' });
	const [showHamburger, setHamburger] = useState(false);

	const chatQuery = getChats();

	const [chats] = useCollectionData(chatQuery, { idField: 'id' });
	const usersQuery = getUsersQuery();
	const [users] = useCollectionData(usersQuery, { idField: 'id' });

	const chat = chats ? chats.find(({ id }) => id === chatId) : null;

	useEffect(() => {
		const newUser = {
			userId: currentUser.uid,
			permission: currentUser.uid !== state.hostId ? 'READ' : 'ADMIN',
			userName: currentUser.displayName,
			userImage: currentUser?.photoURL || '',
			createdAt: new Date().toISOString(),
			chatId: chatId,
		};
		console.log(newUser);

		// addUserToChat(newUser);
		return () => {};
	}, []);

	return (
		<>
			{chat && users && messages && (
				<div className='grid-30-70-layout'>
					<ChatRoomUsersContainer
						users={users}
						setHamburger={setHamburger}
						showHamburger={showHamburger}
					/>
					<ChatRoomMessagesContainer
						setHamburger={setHamburger}
						chat={chat}
						messages={messages}
						users={users}
					/>
				</div>
			)}
		</>
	);
}
