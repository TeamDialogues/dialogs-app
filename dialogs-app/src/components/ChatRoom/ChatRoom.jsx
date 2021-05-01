import { useState } from 'react';
import { currentUser, emojis, chat, users, host } from '../../temp-database';
import './chat-room.css';

export function ChatRoom() {
	const [showEmojiContainer, setEmojiContainerVisibility] = useState(false);
	const [textMessage, setTextMessage] = useState('');
	return (
		<div className='grid-30-70-layout'>
			<div className='grid-item-1 grid-item'>
				<ul>
					{users.map((user) => {
						return <li key={user.id}>{user.name}</li>;
					})}
				</ul>

				<button className='btn btn-secondary-solid'>Create</button>
			</div>
			<div className='grid-item-2 grid-item'>
				<div className='chat-details'>
					<h1>{chat.title}</h1>
					<p>{chat.agenda}</p>
				</div>

				<div className='divider-overlay'>
					<span className='chat-date'>{chat.createdAt.toDateString()}</span>
				</div>

				{chat.messages.map((message) => {
					return (
						<div
							key={message.id}
							className={`chat-bubble-wrapper ${
								message.sender.id === currentUser.id
									? 'chat-bubble-wrapper-right'
									: 'chat-bubble-wrapper-left'
							}`}>
							<img
								className='avatar'
								src={message.sender.avatar}
								alt={message.sender.name}
							/>
							<div className='message-container'>
								<div
									className={`chat-bubble ${
										message.sender.id === currentUser.id
											? 'chat-bubble-right'
											: 'chat-bubble-left'
									}`}>
									{message.text}
								</div>
								<div className='bubble-sender-name'>
									{message.sender.name} {message.createdAt.getHours()}:
									{message.createdAt.getMinutes()}
								</div>
								{currentUser.id === host.id && (
									<button className='star-on-message btn'>
										<i className='fas fa-star'></i>
									</button>
								)}
							</div>
						</div>
					);
				})}

				<div className='input-message-wrapper'>
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
					<button
						className='btn btn-icon'
						onClick={() => setEmojiContainerVisibility((flag) => !flag)}>
						<i className='far fa-grin-beam'></i>
					</button>
					<input
						disabled={
							chat.users.find(
								({ userId, permission }) =>
									userId === currentUser.id && permission === 'write',
							)
								? false
								: true
						}
						className='input-message-field flex-grow'
						placeholder='Type in your message..'
						type='text'
						value={textMessage}
						onChange={(e) => setTextMessage(e.target.value)}
					/>
					<button className='btn btn-primary-solid'>Send</button>
				</div>
			</div>
		</div>
	);
}
