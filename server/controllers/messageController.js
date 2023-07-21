const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');

/* The code is defining an asynchronous function called `allMessages` that handles a request and
response object. Inside the function, it tries to find all messages in a chat specified by the
`chatId` parameter of the request. It then populates the `sender` field with the properties `name`,
`pic`, and `email`, and populates the `chat` field. Finally, it sends the messages as a JSON
response. If an error occurs, it sets the response status to 400 and throws an error with the error
message. */
//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
	try {
		console.log(req);
		const messages = await Message.find({ chat: req.params.chatId })
			.populate('sender', 'name pfp email')
			.populate('chat');
		res.json(messages);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

/* The `sendMessage` function is an asynchronous function that handles a request 
and response object to send meesage */
//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
	const { content, chatId } = req.body;

	if (!content || !chatId) {
		console.log('Invalid data passed into request');
		return res.sendStatus(400);
	}

	var newMessage = {
		sender: req.user._id,
		content: content,
		chat: chatId,
	};

	console.log('sender: ', req.user.name);

	try {
		var message = await Message.create(newMessage);

		message = await message.populate('sender', 'name pfp');
		message = await message.populate('chat');
		message = await User.populate(message, {
			path: 'chat.users',
			select: 'name pfp email',
		});

		await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

		res.json(message);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

module.exports = { allMessages, sendMessage };
