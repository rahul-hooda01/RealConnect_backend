const express = require('express');
const { getProfile, manageSubscription } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/profile', authMiddleware, getProfile);
router.post('/subscription', authMiddleware, manageSubscription);

module.exports = router;
