const multer = require('multer');
const cloudinary = require('../config/cloudinary');  // Your Cloudinary configuration
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Set up Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,  // Your Cloudinary instance
  params: {
    folder: 'properties',  // Cloudinary folder where files will be stored
    allowedFormats: ['jpg', 'png', 'jpeg'],  // Allowed file formats
  },
});

// Create Multer instance with Cloudinary storage
const upload = multer({ storage });

module.exports = upload;  // Export the Multer instance for use in your routes
