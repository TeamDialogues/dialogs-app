import 'firebase/firestore';
import 'firebase/auth';

import { firestore } from '../config/firebaseConfig';

export function getChats() {
	const messagesRef = firestore.collection('chatrooms');

	const query = messagesRef;

	return query;
}

export function getUsersQuery() {
	const usersRef = firestore.collection('users');
	return usersRef;
}

export function getMessageQueryFromChatId(chatId) {
	const messagesRef = firestore.collection('messages');

	const query = messagesRef
		.where('chatRoomId', '==', chatId)
		.orderBy('createdAt');

	return query;
}

export async function addUserToChat(newUser) {
	const usersRef = firestore.collection('users');
	const chatResponse = await usersRef.add(newUser);
}

export async function setPermissionForUserForChat(
	userId,
	chatId,
	permissonToBeGiven,
) {
	const usersRef = firestore
		.collection('users')
		.where('userId', '==', userId)
		.where('chatId', '==', chatId)
		.get();

	if ((await usersRef).docs.length != 0) {
		const docId = (await usersRef).docs[0].id;

		firestore.collection('users').doc(docId).update({
			permission: permissonToBeGiven,
		});
	}
}

export function closeChat(chatId, isSaved) {
	if (isSaved) {
		firestore.collection('chatrooms').doc(chatId).update({
			currentStatus: 'saved',
		});
	} else {
		firestore.collection('chatrooms').doc(chatId).update({
			currentStatus: 'discarded',
		});
	}

	const removeUserAccessFromChatQuery = firestore
		.collection('users')
		.where('chatId', '==', chatId);
	removeUserAccessFromChatQuery.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			doc.ref.delete();
		});
	});
}

export function makeChatPublic(chatId) {
	firestore.collection('chatrooms').doc(chatId).update({
		currentStatus: 'public',
	});
}

export async function sendMessage(userMessageDetails) {
	console.log('userdetail', userMessageDetails);
	const messagesRef = firestore.collection('messages');
	await messagesRef.add(userMessageDetails);
}

export async function createRoom(newRoom, userAdmin) {
	const chatRoomsRef = firestore.collection('chatrooms');
	const usersRef = firestore.collection('users');
	const chatResponse = await chatRoomsRef.add(newRoom);
	const updatedUserAdmin = { ...userAdmin, chatId: chatResponse.id };
	const userResponse = await usersRef.add(updatedUserAdmin);
}

export function removeUser(userId, chatId) {
	const leaveChatRoomQuery = firestore
		.collection('users')
		.where('chatId', '==', chatId)
		.where('userId', '==', userId);
	leaveChatRoomQuery.get().then(function (querySnapshot) {
		querySnapshot.forEach(function (doc) {
			doc.ref.delete();
		});
	});
}
