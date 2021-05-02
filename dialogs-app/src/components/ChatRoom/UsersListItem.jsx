import { useState } from 'react';
import { setPermissionForUserForChat } from '../../DBfunctions/dbFunctions';

export const UserListItem = ({ user, isCurrentUserAdmin, chatId }) => {
	const [showPermitOptions, setPermitOptions] = useState(false);

	console.log({ isCurrentUserAdmin });

	const grantOrDenyWriteAccess = async (userId, chatId, permissonToBeGiven) => {
		try {
			await setPermissionForUserForChat(userId, chatId, permissonToBeGiven);
			console.log('working');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<li
			className='users-list-item'
			style={{
				backgroundColor:
					user.permission !== 'ADMIN' ? '' : 'var(--primary-color-light)',
			}}>
			{user?.avatar ? (
				<img
					className='avatar margin-right-8px'
					src={user?.avatar}
					alt={user?.userName}
				/>
			) : (
				<div className='avatar text-avatar margin-right-8px'>
					{user.userName[0].toUpperCase()}
				</div>
			)}
			<div className='flex-grow'>{user.userName}</div>

			{user.permission === 'REQUEST' && (
				<button
					disabled={isCurrentUserAdmin ? false : true}
					className='btn padding-0'
					onClick={() => {
						setPermitOptions((flag) => !flag);
					}}>
					<i
						className='fas fa-hand-paper margin-left-4px'
						style={{ color: '#F0325B' }}></i>
				</button>
			)}
			{user.permission === 'ADMIN' && (
				<span style={{ color: 'var(--primary-color' }}>Admin</span>
			)}
			{user.permission === 'READ' && (
				<span className='pill-badge' style={{ backgroundColor: '#EEBA02' }}>
					Guest
				</span>
			)}
			{user.permission === 'WRITE' && (
				<span className='pill-badge' style={{ backgroundColor: '#8DCA4C' }}>
					Active
				</span>
			)}

			{showPermitOptions && (
				<div className='btn-container'>
					{user.permission === 'REQUEST' && (
						<>
							<button
								className='btn btn-text'
								onClick={() =>
									grantOrDenyWriteAccess(user.id, chatId, 'WRITE')
								}>
								Accept
							</button>
							<button
								className='btn btn-text'
								onClick={() => grantOrDenyWriteAccess(user.id, chatId, 'READ')}>
								Deny
							</button>
						</>
					)}
				</div>
			)}
		</li>
	);
};
