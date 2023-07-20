const express = require('express');
const dotenv = require('dotenv');
const chats = require('./data/data'); // Dummy data
const { connectDB } = require('./config/db');
const userRotues = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
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

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, console.log(`Hello from server at ${port}!`));
