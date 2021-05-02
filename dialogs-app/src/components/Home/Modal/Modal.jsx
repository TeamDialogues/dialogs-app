import './modal.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useAuthentication } from '../../../context';
import { createRoom } from '../../../DBfunctions/dbFunctions';
// import { chatRooms } from "../home/mockdata";

const useStyles = makeStyles(() => ({
	input: {
		width: '100%',
		borderColor: '#7c3aed',
	},
}));

export const Modal = ({ setShowModal }) => {
	const classes = useStyles();
	const [chatRoom, setChatRoom] = useState({
		title: '',
		agenda: '',
	});
	const [validationError, setValidationError] = useState({
		title: '',
		agenda: '',
	});
	const { authStates } = useAuthentication();

	const onChangeHandler = (e) => {
		setChatRoom((chatRoom) => ({
			...chatRoom,
			[e.target.name]: e.target.value,
		}));
	};

	const validateForm = (title, agenda) => {
		let isValidationSuccess = true;

		if (!title) {
			setValidationError((error) => ({
				...error,
				title: 'Title Field is empty',
			}));
			isValidationSuccess = false;
		}
		if (!agenda || agenda.length < 30) {
			setValidationError((error) => ({
				...error,
				agenda: 'Agenda Field should contain atleast 30 characters',
			}));
			isValidationSuccess = false;
		}
		return isValidationSuccess;
	};

	const createRoomHandler = async (e) => {
		e.preventDefault();
		try {
			setValidationError({ title: '', agenda: '' });
			if (validateForm(chatRoom.title, chatRoom.agenda)) {
				const newRoom = {
					hostId: authStates.currentUser.uid,
					hostName: authStates.currentUser.displayName,
					title: chatRoom.title,
					agenda: chatRoom.agenda,
					currentStatus: 'ongoing', //has to be made ENUM
					createdAt: new Date().toISOString(),
				};

				const userAdmin = {
					userId: authStates.currentUser.uid,
					permission: 'ADMIN',
					userName: authStates?.currentUser?.displayName,
					userImage: authStates?.currentUser?.photoURL || '',
					createdAt: new Date().toISOString(),
				};
				await createRoom(newRoom, userAdmin);
				setChatRoom({ title: '', agenda: '' });
				setShowModal((prev) => !prev);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const discardCreateRoom = (e) => {
		e.preventDefault();
		setChatRoom({ title: '', agenda: '' });
		setShowModal((prev) => !prev);
	};
	return (
		<div className='modal-container'>
			<h3>Create a Room</h3>
			<div className='field-container'>
				<TextField
					id='outlined-basic'
					label='Title'
					variant='outlined'
					className={classes.input}
					value={chatRoom.title}
					name='title'
					onChange={onChangeHandler}
				/>
				{validationError.title && (
					<small className='error-alert'>*{validationError.title}</small>
				)}
			</div>
			<div className='field-container'>
				<TextField
					multiline={true}
					rows={4}
					id='outlined-basic'
					label='Agenda'
					variant='outlined'
					className={classes.input}
					value={chatRoom.agenda}
					name='agenda'
					onChange={onChangeHandler}
				/>
				{validationError.agenda && (
					<small className='error-alert'>*{validationError.agenda}</small>
				)}
			</div>
			<div className='flex-center modal-btns'>
				<button
					className='btn btn-square btn-outline-secondary'
					onClick={discardCreateRoom}>
					Cancel
				</button>
				<button
					className='btn btn-square btn-outline'
					onClick={createRoomHandler}>
					Create Room
				</button>
			</div>
		</div>
	);
};
