const express = require('express');
const chats = require('../data/data');  // Dummy data

const app = express();

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

app.listen(5000, console.log('Hello from server!'));
