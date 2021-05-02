import { useEffect, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './chat-room.css';

import {
	getChatFromId,
	getMessageQueryFromChatId,
	addUserToChat,
} from '../../DBfunctions/dbFunctions';
import { ChatRoomMessagesContainer } from './ChatRoomMessagesContainer';
import { ChatRoomUsersContainer } from './ChatRoomUsersContainer';

const chatId = 'GXavhxw7uD3UKuJZAZAJ';

export function ChatRoom() {
	const messagesQuery = getMessageQueryFromChatId(chatId);

	const [messages] = useCollectionData(messagesQuery, { idField: 'id' });
	const [showHamburger, setHamburger] = useState(false);

	console.log({ messages });

	const chatQuery = getChatFromId();
	const [chats] = useCollectionData(chatQuery, { idField: 'id' });
	const chat = chats ? chats.find(({ id }) => id === chatId) : null;

	useEffect(() => {
		//make user's permission in chat model- read
		// getChatFromId(chatId, setChatData);
		return () => {
			//remove user from users array in chat model
		};
	}, []);

	return (
		<>
			{chat && (
				<div className='grid-30-70-layout'>
					<ChatRoomUsersContainer
						setHamburger={setHamburger}
						showHamburger={showHamburger}
					/>
					<ChatRoomMessagesContainer
						setHamburger={setHamburger}
						chat={chat}
						messages={messages}
					/>
				</div>
			)}
		</>
	);
}
