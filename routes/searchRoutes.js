const express = require('express');
const { searchForProperties } = require('../controllers/searchController');
const router = express.Router();

router.get('/properties', searchForProperties);

module.exports = router;
