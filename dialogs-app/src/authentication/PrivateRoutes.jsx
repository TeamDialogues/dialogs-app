import { Route, Navigate } from 'react-router-dom';
import { useAuthentication } from '../context';

export const PrivateRoutes = ({ path, ...props }) => {
	const { authStates } = useAuthentication();
	return authStates.isLoggedIn ? (
		<Route {...props} path={path} />
	) : (
		<Navigate state={{ from: path }} replace to='/login' />
	);
};
