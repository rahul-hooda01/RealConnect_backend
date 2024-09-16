const express = require('express');
const { getAllUsersController, deleteUserController } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router = express.Router();

router.get('/users', authMiddleware, adminMiddleware, getAllUsersController);
router.delete('/users/:userId', authMiddleware, adminMiddleware, deleteUserController);

module.exports = router;
