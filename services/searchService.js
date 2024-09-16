const Property = require('../models/Property');

// Service to search properties based on filters
const searchProperties = async (filters) => {
  const { location, type, priceRange, bedrooms } = filters;

  const query = {};
  if (location) query.location = location;
  if (type) query.type = type;
  if (priceRange) query.price = { $lte: priceRange };
  if (bedrooms) query.bedrooms = bedrooms;

  const properties = await Property.find(query);
  return properties;
};

module.exports = { searchProperties };
