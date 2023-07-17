const express = require('express');
const dotenv = require('dotenv');
const chats = require('./data/data'); // Dummy data
const { connectDB } = require('./config/db');
const userRotues = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
// Configure environment variables
dotenv.config();
connectDB();

app.use(express.json());

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
	res.send('Welcome to chaty API!');
});

app.use('/api/user', userRotues);

const port = process.env.PORT;

app.listen(port, console.log(`Hello from server at ${port}!`));
