const mongoose = require('mongoose');

const chatModel = mongoose.Schema(
	{
		chatName: { type: String, trim: true },
		isGroupChat: { type: Boolean, default: false },
		user: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		lastMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Message',
		},
		groupAdmin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const Chat = mongoose.model('Chat', chatModel);

export default Chat;
