import { useState } from 'react';

export const UserListItem = ({ user, isCurrentUserAdmin }) => {
	const handColors = {
		READ: '#EEBA02',
		WRITE: '#8DCA4C',
		REQUEST: '#F0325B',
	};

	const [showPermitOptions, setPermitOptions] = useState(false);
	return (
		<li
			className='users-list-item'
			style={{
				backgroundColor:
					user.permission !== 'ADMIN' ? '' : 'var(--primary-color-light)',
			}}>
			<img className='avatar margin-right-8px' src={user.avatar} />
			<div className='flex-grow'>{user.name}</div>

			{user.permission !== 'ADMIN' ? (
				<button
					disabled={isCurrentUserAdmin ? false : true}
					className='btn padding-0'
					onClick={() => {
						setPermitOptions((flag) => !flag);
					}}>
					<i
						className='fas fa-hand-paper margin-left-4px'
						style={{ color: handColors[user.permission] }}></i>
				</button>
			) : (
				<span style={{ color: 'var(--primary-color' }}>Admin</span>
			)}

			{showPermitOptions && (
				<div className='btn-container'>
					{user.permission === 'REQUEST' && (
						<>
							<button className='btn btn-text'>Accept</button>
							<button className='btn btn-text'>Deny</button>
						</>
					)}
					<button className='btn btn-text'>Kick Out</button>
				</div>
			)}
		</li>
	);
};
