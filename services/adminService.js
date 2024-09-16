const User = require('../models/User');

// Service to get all users
const getAllUsers = async () => {
  return await User.find().select('-password');
};

// Service to delete a user
const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = { getAllUsers, deleteUser };
