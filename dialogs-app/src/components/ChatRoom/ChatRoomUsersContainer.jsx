import { useAuthentication } from '../../context';
import { setPermissionForUserForChat } from '../../DBfunctions/dbFunctions';
import { UserListItem } from './UsersListItem';
import { checkUserPermissionWrite, sortUsers } from './utils';

export const ChatRoomUsersContainer = ({
	users,
	setHamburger,
	showHamburger,
	chatId,
}) => {
	const { authStates } = useAuthentication();
	const { sortedUsers, isCurrentUserAdmin } = sortUsers({
		users,
		currentUser: authStates?.currentUser,
		chatId,
	});
	console.log({ users });

	const requestWriteAccess = async (userId, chatId, permissonToBeGiven) => {
		if (
			!checkUserPermissionWrite({
				users,
				currentUser: authStates.currentUser,
				chatId,
			})
		) {
			console.log('herrrree');
			await setPermissionForUserForChat(userId, chatId, permissonToBeGiven);
		}
	};
	return (
		<div className={`grid-item-1 grid-item ${showHamburger && 'active'}`}>
			<button
				className='hamburger-cross'
				onClick={() => {
					setHamburger((flag) => !flag);
				}}>
				<i className='fas fa-times'></i>
			</button>
			<button
				className='btn btn-square raise-request-btn'
				onClick={() =>
					requestWriteAccess(authStates.currentUser.uid, chatId, 'REQUEST')
				}>
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
								chatId={chatId}
							/>
						),
				)}
			</ul>
		</div>
	);
};
