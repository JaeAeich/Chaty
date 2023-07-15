const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	name: {
		type: string,
		require: true,
	},

	email: {
		type: string,
		require: true,
	},
	password: {
		type: string,
		require: true,
	},

	pfp: {
		type: string,
		required: true,
		default:
			'https://cdn-icons-png.flaticon.com/512/149/149071.png?w=826&t=st=1689422645~exp=1689423245~hmac=8322841ac71f0d730a1935c2ea057cd7634c9dc174a009d5034c58e4dd422344',
	},
});

const User = mongoose.model('User', userSchema);

export default User;
