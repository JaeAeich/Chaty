const express = require('express');
const {
	registerUser,
	authUser,
	allUsers,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, allUsers);
router.post('/', registerUser);
router.post('/login', authUser);

module.exports = router;
