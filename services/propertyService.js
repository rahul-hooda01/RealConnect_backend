const Property = require('../models/Property');
const cloudinary = require('../config/cloudinary');

// Service to create a property
const createProperty = async (propertyDetails, imagePath, userId) => {
  const { title, location, price, bedrooms, bathrooms } = propertyDetails;
  
  const uploadedImage = await cloudinary.uploader.upload(imagePath);

  const property = await Property.create({
    title,
    location,
    price,
    bedrooms,
    bathrooms,
    image: uploadedImage.secure_url,
    listedBy: userId,
  });

  return property;
};

// Service to get all properties
const getAllProperties = async () => {
  const properties = await Property.find().populate('listedBy', 'name email');
  return properties;
};

// Service to get a specific property
const getPropertyById = async (propertyId) => {
  const property = await Property.findById(propertyId).populate('listedBy', 'name email');
  if (!property) throw new Error('Property not found');
  return property;
};

module.exports = { createProperty, getAllProperties, getPropertyById };
