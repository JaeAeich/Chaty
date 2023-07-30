const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
	{
		name: {
			type: 'String',
			require: true,
		},
		email: {
			type: 'String',
			require: true,
		},
		password: {
			type: 'String',
			require: true,
		},
		pfp: {
			type: 'String',
			default:
				'https://cdn-icons-png.flaticon.com/512/149/149071.png?w=826&t=st=1689422645~exp=1689423245~hmac=8322841ac71f0d730a1935c2ea057cd7634c9dc174a009d5034c58e4dd422344',
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestaps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
	if (!this.isModified) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
