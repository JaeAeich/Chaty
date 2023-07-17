const express = require('express');
const {
	registerUser,
	authUser,
	allUsers,
} = require('../controllers/userController');

const router = express.Router();

router.get('/', allUsers);
router.post('/', registerUser);

module.exports = router;
