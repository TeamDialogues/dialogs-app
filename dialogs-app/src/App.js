import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home, ChatRoom } from './components';
import { Login, Signup, PrivateRoutes } from './authentication';

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
