const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const userRotues = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');

const app = express();

// Configure environment variables
dotenv.config();
connectDB();
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Welcome to chaty API!');
});

app.use('/api/user', userRotues);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;

const server = app.listen(port, console.log(`Hello from server at ${port}!`));

const io = require('socket.io')(server, {
	pingTimeout: 60000,
	cors: {
		origin: process.env.CLIENT_BASE_URL,
		// credentials: true,
	},
});

/* The code block `io.on('connection', (socket) => { ... })` is an event listener that listens for a
connection event from a client. When a client connects to the server using Socket.IO, this event is
triggered. */
io.on('connection', (socket) => {
	console.log('Connected to socket.io');
	socket.on('setup', (userData) => {
		socket.join(userData._id);
		socket.emit('connected');
	});

	/* An event listener that listens for the 'join chat' event from the client. When this
	event is triggered, the server joins the specified room using `socket.join(room)`. The room
	parameter represents the chat room that the user wants to join. After joining the room, the server
	logs a message indicating that the user has joined the room. */
	socket.on('join chat', (room) => {
		socket.join(room);
		console.log('User Joined Room: ' + room);
	});
	socket.on('typing', (room) => socket.in(room).emit('typing'));
	socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

	/* The code block `socket.on('new message', (newMessageRecieved) => { ... })` is an event listener that
	listens for the 'new message' event from the client. When this event is triggered, the server
	executes the code inside the callback function. */
	socket.on('new message', (newMessageRecieved) => {
		var chat = newMessageRecieved.chat;

		if (!chat.users) return console.log('chat.users not defined');

		chat.users.forEach((user) => {
			if (user._id == newMessageRecieved.sender._id) return;

			socket.in(user._id).emit('message recieved', newMessageRecieved);
		});
	});

	/* is used to handle the disconnection of a user from the socket. */
	socket.off('setup', () => {
		console.log('USER DISCONNECTED');
		socket.leave(userData._id);
	});
});
