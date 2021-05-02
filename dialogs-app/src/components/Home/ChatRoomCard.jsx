/* eslint-disable no-unused-vars */

import { useState } from 'react';
import { convertISODateToDate } from '../../utils';

import { addUserToChat } from '../../DBfunctions/dbFunctions';
import { useAuthentication } from '../../context';

import { useNavigate } from 'react-router-dom';

export const ChatRoomCard = ({ chatRoom }) => {
	const navigate = useNavigate();

	const { authStates } = useAuthentication();
	console.log({ chatRoom });
	const { title, agenda, hostName, users, createdAt, currentStatus } = chatRoom;
	const [dateTime] = useState(convertISODateToDate(createdAt));

	const joinUser = (e) => {
		e.preventDefault();
		try {
			const newUser = {
				userId: authStates.currentUser.uid,
				permission:
					authStates.currentUser.uid !== chatRoom.hostId ? 'READ' : 'ADMIN',
				userName: authStates.currentUser.displayName,
				userImage: authStates.currentUser?.photoURL || '',
				createdAt: new Date().toISOString(),
				chatId: chatRoom.id,
			};

			addUserToChat(newUser);

			navigate(`chatroom/${chatRoom.id}`);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='chatroom-card' to={`/chatroom/${chatRoom.id}`}>
			<div className='card__title-container'>
				<div className='flex'>
					<div className='card__title'>{title}</div>
					{currentStatus === 'ongoing' && (
						<div className='live-badge'>live</div>
					)}
				</div>
				<div className='card__buttons'>
					<button className='btn btn-square' onClick={joinUser}>
						Join
					</button>
				</div>
			</div>
			<div className='card__agenda'>{agenda}</div>
			<div className='card__details'>
				<div className='card__details--detail'>Hosted By {hostName}</div>
				<div className='card__details--detail'>
					{users?.length ? users.length : 0} people joined
				</div>
				<div className='card__details--detail'>
					{`Created At: ${dateTime.date}
        ${dateTime.time}`}
				</div>
			</div>
		</div>
	);
};
