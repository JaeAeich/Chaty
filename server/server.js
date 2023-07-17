const express = require('express');
const dotenv = require('dotenv');
const chats = require('./data/data'); // Dummy data
const { connectDB } = require('./config/db');
const userRotues = require('./routes/userRoutes')

const app = express();
// Configure environment variables
dotenv.config();
connectDB();

app.get('/', (req, res) => {
	res.send('Welcome to chaty API!');
});

app.use('/api/user', userRotues);

const port = process.env.PORT;

app.listen(port, console.log(`Hello from server at ${port}!`));
