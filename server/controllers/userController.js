const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, pic } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please fill in all the fields');
	}

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('Email already exists');
	}

	const user = await User.create({
		name,
		email,
		password,
		pic,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			pic: user.pic,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('User not found');
	}
});
