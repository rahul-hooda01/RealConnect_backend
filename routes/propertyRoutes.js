const express = require('express');
const { createProperty, getAllProperties, getPropertyById } = require('../controllers/propertyController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const router = express.Router();

router.post('/', authMiddleware, upload.single('image'), createProperty);
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

module.exports = router;
