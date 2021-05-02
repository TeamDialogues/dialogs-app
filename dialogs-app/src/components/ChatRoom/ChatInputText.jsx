import { useState } from 'react';
import { emojis } from '../../temp-database';

export const ChatInputText = () => {
	const [textMessage, setTextMessage] = useState('');
	const [showEmojiContainer, setEmojiContainerVisibility] = useState(false);
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
				disabled
				className='input-message-field flex-grow'
				placeholder='Type in your message..'
				type='text'
				value={textMessage}
				onChange={(e) => setTextMessage(e.target.value)}
			/>
			<button className='btn btn-bubble'>Send</button>
		</div>
	);
};
