import { useAuthentication } from '../../context';
import { ChatInputText } from './ChatInputText';

export const ChatRoomMessagesContainer = ({
	chat,
	messages,
	setHamburger,
	users,
}) => {
	const { authStates } = useAuthentication();
	const hostOfTheChat = { id: chat?.hostId };

	return (
		<>
			{chat && (
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
										message?.userId === authStates?.currentUser?.uid
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
											{message.userName[0].toUpperCase()}
										</div>
									)}

									<div className='message-container'>
										<div
											className={`chat-bubble ${
												message?.userId === authStates?.currentUser?.uid
													? 'chat-bubble-right'
													: 'chat-bubble-left'
											}`}>
											{message?.text}
										</div>
										<div className='bubble-sender-name'>
											{message?.userName}{' '}
											{new Date(message?.createdAt).getHours()}:
											{new Date(message?.createdAt).getMinutes()}
										</div>
										{authStates?.currentUser?.uid === hostOfTheChat?.id && (
											<button className='star-on-message btn'>
												<i className='fas fa-star'></i>
											</button>
										)}
									</div>
								</div>
							);
						})}

					<div id='last-message'></div>
					<ChatInputText users={users} chatId={chat.id} />
				</div>
			)}
		</>
	);
};
