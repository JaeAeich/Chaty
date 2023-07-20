/**
 * The function determines the margin value for a message based on whether it is from the same sender
 * as the next message and whether the current user is the sender.
 * @param messages - An array of message objects.
 * @param m - The current message object
 * @param i - The parameter `i` represents the index of the current message in the `messages` array.
 * @param userId - The `userId` parameter is the ID of the user for whom we are checking if the sender
 * of the current message is the same as the sender of the next message.
 * @returns a number (either 33 or 0) or the string 'auto'.
 */
export const isSameSenderMargin = (messages, m, i, userId) => {
	if (
		i < messages.length - 1 &&
		messages[i + 1].sender._id === m.sender._id &&
		messages[i].sender._id !== userId
	)
		return 33;
	else if (
		(i < messages.length - 1 &&
			messages[i + 1].sender._id !== m.sender._id &&
			messages[i].sender._id !== userId) ||
		(i === messages.length - 1 && messages[i].sender._id !== userId)
	)
		return 0;
	else return 'auto';
};

/**
 * The function checks if the sender of a message is the same as the sender of the next message in an
 * array, and if the sender is not the same as the given user ID.
 * @param messages - An array of message objects.
 * @param m - The `m` parameter represents the current message object in the `messages` array.
 * @param i - The parameter `i` represents the index of the current message in the `messages` array.
 * @param userId - The `userId` parameter is the ID of the user for whom we want to check if the sender
 * of the current message is the same as the sender of the next message.
 * @returns a boolean value.
 */
export const isSameSender = (messages, m, i, userId) => {
	return (
		i < messages.length - 1 &&
		(messages[i + 1].sender._id !== m.sender._id ||
			messages[i + 1].sender._id === undefined) &&
		messages[i].sender._id !== userId
	);
};

/**
 * The function checks if the last message in an array of messages was sent by a specific user.
 * @param messages - An array of message objects.
 * @param i - The index of the current message in the array of messages.
 * @param userId - The `userId` parameter is the unique identifier of the user for whom we want to
 * check if the last message in the `messages` array was sent by them.
 * @returns a boolean value.
 */
export const isLastMessage = (messages, i, userId) => {
	return (
		i === messages.length - 1 &&
		messages[messages.length - 1].sender._id !== userId &&
		messages[messages.length - 1].sender._id
	);
};

/**
 * The function checks if the sender of a message at index i is the same as the sender of the previous
 * message.
 * @param messages - An array of message objects. Each message object has a "sender" property which
 * contains an object with an "_id" property.
 * @param m - The current message object that we are comparing with the previous message.
 * @param i - The parameter `i` represents the index of the current message in the `messages` array.
 * @returns a boolean value indicating whether the sender of the current message (m) is the same as the
 * sender of the previous message in the messages array.
 */
export const isSameUser = (messages, m, i) => {
	return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

/**
 * The `getSender` function returns the name of the sender based on the logged user and an array of
 * users.
 * @param loggedUser - The loggedUser parameter represents the currently logged-in user. It is an
 * object that contains information about the user, such as their ID.
 * @param users - An array of user objects. Each user object has the following properties:
 * @returns the name of the sender.
 */
export const getSender = (loggedUser, users) => {
	return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};

/**
 * The function `getSenderFull` returns the full details of the sender, given the logged-in user and an
 * array of users.
 * @param loggedUser - The loggedUser parameter is an object representing the currently logged-in user.
 * It likely contains properties such as _id, name, email, etc.
 * @param users - An array of user objects. Each user object has properties like `_id` (user ID) and
 * other user details.
 * @returns the user object of the sender, which is either the second user in the `users` array if the
 * logged user is the first user, or the first user in the `users` array if the logged user is the
 * second user.
 */
export const getSenderFull = (loggedUser, users) => {
	return users[0]._id === loggedUser._id ? users[1] : users[0];
};
