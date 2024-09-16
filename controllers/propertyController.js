const Property = require('../models/Property');
const cloudinary = require('../config/cloudinary');

// Create New Property
const createProperty = async (req, res) => {
  const { title, location, price, bedrooms, bathrooms } = req.body;
  try {
    const image = req.file.path;
    const uploadedImage = await cloudinary.uploader.upload(image);

    const property = await Property.create({
      title,
      location,
      price,
      bedrooms,
      bathrooms,
      image: uploadedImage.secure_url,
      listedBy: req.user._id,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('listedBy', 'name email');
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Property By ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('listedBy', 'name email');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProperty, getAllProperties, getPropertyById };
