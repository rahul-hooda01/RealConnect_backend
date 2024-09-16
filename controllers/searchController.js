const { searchProperties } = require('../services/searchService');

// Controller to handle property search
const searchForProperties = async (req, res) => {
  try {
    const { location, type, priceRange, bedrooms } = req.query;
    const searchResults = await searchProperties({ location, type, priceRange, bedrooms });
    res.status(200).json(searchResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { searchForProperties };
