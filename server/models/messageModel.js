const mongoose = require('mongoose');

const messageModel = mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		chat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Chat',
		},
		content: { type: 'string', trim: true },
		readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	},
	{
		timestamps: true,
	}
);

const Message = mongoose.model('Message', messageModel);

module.exports = Message;
