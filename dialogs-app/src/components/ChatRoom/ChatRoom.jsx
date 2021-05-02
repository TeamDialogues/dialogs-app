import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './chat-room.css';

import {
	getChats,
	getMessageQueryFromChatId,
	getUsersQuery,
	removeUser,
} from '../../DBfunctions/dbFunctions';
import { ChatRoomMessagesContainer } from './ChatRoomMessagesContainer';
import { ChatRoomUsersContainer } from './ChatRoomUsersContainer';
import { useParams } from 'react-router-dom';
import { useAuthentication } from '../../context';

export function ChatRoom({ state }) {
	const { chatId } = useParams();

	const messagesQuery = getMessageQueryFromChatId(chatId);

	const [messages] = useCollectionData(messagesQuery, { idField: 'id' });
	const [showHamburger, setHamburger] = useState(false);

	const chatQuery = getChats();

	const [chats] = useCollectionData(chatQuery, { idField: 'id' });
	const usersQuery = getUsersQuery();
	const [users] = useCollectionData(usersQuery, { idField: 'id' });
	const { authStates } = useAuthentication();

	const chat = chats ? chats.find(({ id }) => id === chatId) : [];

	const allChatUsers = users && users.filter((user) => user.chatId === chatId);

	useEffect(() => {
		return () => {
			removeUser(authStates.currentUser.uid, chatId);
		};
	}, []);

	return (
		<>
			{chat && allChatUsers && messages && (
				<div className='grid-30-70-layout'>
					<ChatRoomUsersContainer
						users={allChatUsers}
						setHamburger={setHamburger}
						showHamburger={showHamburger}
						chatId={chat.id}
					/>
					<ChatRoomMessagesContainer
						setHamburger={setHamburger}
						chat={chat}
						messages={messages}
						users={allChatUsers}
					/>
				</div>
			)}
		</>
	);
}
