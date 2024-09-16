const { getAllUsers, deleteUser } = require('../services/adminService');

// Controller to get all users (Admin functionality)
const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a user (Admin functionality)
const deleteUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    await deleteUser(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsersController, deleteUserController };
