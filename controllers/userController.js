const { getUserProfile, updateUserSubscription } = require('../services/userService');

// Controller to get user profile
const getProfile = async (req, res) => {
  try {
    const userProfile = await getUserProfile(req.user._id);
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to handle subscription management
const manageSubscription = async (req, res) => {
  try {
    const { subscriptionType } = req.body;
    const updatedSubscription = await updateUserSubscription(req.user._id, subscriptionType);
    res.status(200).json(updatedSubscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile, manageSubscription };
