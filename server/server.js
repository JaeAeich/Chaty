const express = require('express');
const dotenv = require('dotenv');
const chats = require('./data/data'); // Dummy data
const { connectDB } = require('./config/db');

const app = express();
// Configure environment variables
dotenv.config();
connectDB();

app.get('/', (req, res) => {
	res.send('Welcome to chaty API!');
});

app.get('/api/chat', (req, res) => {
	console.log(chats);
	res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
	let id = req.params['id'];
	res.send(id);
});

const port = process.env.PORT;

app.listen(port, console.log(`Hello from server at ${port}!`));
