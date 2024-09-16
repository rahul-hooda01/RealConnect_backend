const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, sendMessage);
router.get('/', authMiddleware, getMessages);

module.exports = router;
