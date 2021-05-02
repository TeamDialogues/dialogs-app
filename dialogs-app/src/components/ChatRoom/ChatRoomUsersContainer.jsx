import { chat } from '../../temp-database';
import { UserListItem } from './UsersListItem';
import { currentUser } from '../../temp-database';
import { sortUsers } from './utils';

export const ChatRoomUsersContainer = ({
	users,
	setHamburger,
	showHamburger,
}) => {
	const { sortedUsers, isCurrentUserAdmin } = sortUsers({
		users: chat.users,
		currentUser,
	});
	console.log(sortedUsers);
	return (
		<div className={`grid-item-1 grid-item ${showHamburger && 'active'}`}>
			<button
				className='hamburger-cross'
				onClick={() => {
					setHamburger((flag) => !flag);
				}}>
				<i className='fas fa-times'></i>
			</button>
			<button className='btn btn-square raise-request-btn'>
				<i className='fas fa-hand-paper margin-right-4px'></i>Raise Request To
				Join Chat
			</button>
			<ul className='users-list'>
				{sortedUsers.map(
					(user) =>
						user && (
							<UserListItem
								key={user.id}
								user={user}
								isCurrentUserAdmin={isCurrentUserAdmin}
							/>
						),
				)}
			</ul>
		</div>
	);
};
