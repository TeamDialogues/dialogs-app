// export const emojis = [0x1f600, 0x1f923, 0x1f622, 0x1f631, 0x1f910, 0x1f60d];
export const emojis = ['😀', '🤣', '😍', '🔥', '👍', '👎'];

export const users = [
	{
		id: 1,
		name: 'Ironman',
		avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
		status: 'active',
	},
	{
		id: 2,
		name: 'Thor',
		avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
		status: 'guest',
	},
	{
		id: 3,
		name: 'Cpt.America',
		avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
		status: 'active',
	},
];

export const host = {
	id: 2,
	name: 'Thor',
};

export const currentUser = {
	id: 1,
	name: 'Ironman',
};
export const chat = {
	id: 1,
	title: 'This is a demo session',

	users: [{ userId: 1, permission: 'read' }],

	messages: [
		{
			id: 1,
			text: 'I am Ironman',
			sender: {
				id: 1,
				name: 'Ironman',
				avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
			},
			createdAt: new Date(),
		},
		{
			id: 2,
			text: 'Love you 3000',
			sender: {
				id: 2,
				name: 'Thor',
				avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
			},
			createdAt: new Date(),
		},
		{
			id: 3,
			text: 'Yeahhhhhhhhhhh',
			sender: {
				id: 3,
				name: 'Cpt. America',
				avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
			},
			createdAt: new Date(),
		},
		{
			id: 4,
			text: 'I am Ironman',
			sender: {
				id: 1,
				name: 'Ironman',
				avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
			},
			createdAt: new Date(),
		},
		{
			id: 5,
			text: 'Love you 3000 😍',
			sender: {
				id: 2,
				name: 'Thor',
				avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
			},
			createdAt: new Date(),
		},
		{
			id: 6,
			text: 'Yeahhhhhhhhhhh',
			sender: {
				id: 3,
				name: 'Cpt. America',
				avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
			},
			createdAt: new Date(),
		},
		{
			id: 7,
			text:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
			sender: {
				id: 1,
				name: 'Ironman',
				avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
			},
			createdAt: new Date(),
		},
		{
			id: 8,
			text: 'Love you 3000',
			sender: {
				id: 2,
				name: 'Thor',
				avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
			},
			createdAt: new Date(),
		},
		{
			id: 9,
			text:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
			sender: {
				id: 3,
				name: 'Cpt. America',
				avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
			},
			createdAt: new Date(),
		},
	],
	agenda:
		'Tum mile to jadu chha gya tum mile to jeena aagya tum mile to maine paya he khuda.....',
	createdAt: new Date(),
};
