import { useState } from 'react';
import { emojis } from '../../temp-database';
import { sendMessage } from '../../DBfunctions/dbFunctions';
import { checkUserPermissionWrite } from './utils';
import { useAuthentication } from '../../context';

export const ChatInputText = ({ chatId, users }) => {
	const [textMessage, setTextMessage] = useState('');
	const [showEmojiContainer, setEmojiContainerVisibility] = useState(false);
	const { authStates } = useAuthentication();

	return (
		<div className='input-message-wrapper'>
			<a href='#last-message' className='link jump-to-present-button'>
				Jump to present <i className='fas fa-chevron-down'></i>
			</a>

			{showEmojiContainer && (
				<div className='emoji-container'>
					{emojis.map((emoji) => (
						<button
							key={emoji}
							className='emoji btn-icon btn'
							onClick={() =>
								setTextMessage((message) => message.concat(emoji))
							}>
							{emoji}
						</button>
					))}
				</div>
			)}
			<div
				className='btn btn-icon'
				onClick={() => setEmojiContainerVisibility((flag) => !flag)}>
				<i className='far fa-grin-beam'></i>
			</div>
			<input
				disabled={
					!checkUserPermissionWrite({
						users,
						currentUser: authStates?.currentUser,
					})
				}
				className='input-message-field flex-grow'
				placeholder='Type in your message..'
				type='text'
				value={textMessage}
				onChange={(e) => setTextMessage(e.target.value)}
			/>
			<button
				disabled={
					!checkUserPermissionWrite({
						users,
						currentUser: authStates?.currentUser,
					})
				}
				className='btn btn-bubble'
				onClick={() => {
					console.log(
						'hummmm',
						checkUserPermissionWrite({
							users,
							currentUser: authStates?.currentUser,
						}),
					);
					if (
						checkUserPermissionWrite({
							users,
							currentUser: authStates?.currentUser,
						})
					) {
						try {
							const userMessageDetails = {
								userId: authStates?.currentUser.uid,
								userName: authStates?.currentUser.displayName,
								text: textMessage,
								avatar: authStates?.currentUser.displayURL || '',
								chatRoomId: chatId,
								createdAt: new Date().toISOString(),
							};
							console.log({ userMessageDetails });
							sendMessage(userMessageDetails);
						} catch (error) {
							console.log(error);
						}
					}
				}}>
				Send
			</button>
		</div>
	);
};