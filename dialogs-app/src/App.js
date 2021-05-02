import './App.css';
// eslint-disable-next-line no-unused-vars
import { Routes, Route } from 'react-router-dom';
import { Home, ChatRoom } from './components';
import { Login, Signup, PrivateRoutes } from './authentication';
// import ChatRoomFunctionality from './components/ChatFunctionalityPoojaTemp/ChatRoom1';

function App() {
	return (
		<>
			<div className='App'>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<PrivateRoutes path='/' element={<Home />} />
					<Route path='/chatroom/:chatId' element={<ChatRoom />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
