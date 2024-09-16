// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// POST /api/users/register
router.post('/register', registerUser);

// POST /api/users/login
router.post('/login', loginUser);

// GET /api/users/profile
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
