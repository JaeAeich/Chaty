const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB connected : ${connect.connection.host}`);
		return;
	} catch (err) {
		console.log('Some error occured!');
		process.exit();
	}
};

module.exports = {
	connectDB,
};
