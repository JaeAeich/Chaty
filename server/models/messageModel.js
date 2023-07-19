const mongoose = require('mongoose');

const messageModel = mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		chat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		content: { type: string, trim: true },
	},
	{
		timestamps: true,
	}
);

const Message = mongoose.model('Message', messageModel);

module.exports = Message;
