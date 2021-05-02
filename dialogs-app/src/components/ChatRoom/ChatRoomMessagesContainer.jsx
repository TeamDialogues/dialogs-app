import { currentUser } from '../../temp-database';
import { ChatInputText } from './ChatInputText';
import { sortUsers } from './utils';

export const ChatRoomMessagesContainer = ({ chat, messages, setHamburger }) => {
	// const { hostOfTheChat } = sortUsers({
	// 	users: chat.users,
	// 	currentUser,
	// });
	const hostOfTheChat = { id: chat?.userId };

	return (
		<div className='grid-item-2 grid-item'>
			<div className='chat-details'>
				<h1>{chat.title}</h1>
				<p className='text-color-secondary'>{chat.agenda}</p>
			</div>

			<button
				className='btn btn-open-users-hamburger'
				onClick={() => {
					setHamburger(true);
				}}>
				Users Joined
			</button>

			<div className='divider-overlay'>
				<span className='chat-date'>
					{new Date(chat?.createdAt).toDateString()}
				</span>
			</div>

			{messages &&
				messages.map((message) => {
					return (
						<div
							key={message.id}
							className={`chat-bubble-wrapper ${
								message?.userId === currentUser?.id
									? 'chat-bubble-wrapper-right'
									: 'chat-bubble-wrapper-left'
							}`}>
							{message?.avatar ? (
								<img
									className='avatar'
									src={message?.avatar}
									alt={message?.userName}
								/>
							) : (
								<div className='avatar text-avatar'>
									{message.userName[1].toUpperCase()}
								</div>
							)}

							<div className='message-container'>
								<div
									className={`chat-bubble ${
										message?.userId === currentUser?.id
											? 'chat-bubble-right'
											: 'chat-bubble-left'
									}`}>
									{message?.text}
								</div>
								<div className='bubble-sender-name'>
									{message?.userName} {new Date(message?.createdAt).getHours()}:
									{new Date(message?.createdAt).getMinutes()}
								</div>
								{currentUser?.id === hostOfTheChat?.id && (
									<button className='star-on-message btn'>
										<i className='fas fa-star'></i>
									</button>
								)}
							</div>
						</div>
					);
				})}

			<div id='last-message'></div>
			<ChatInputText />
		</div>
	);
};
