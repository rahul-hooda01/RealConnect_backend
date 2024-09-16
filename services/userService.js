const User = require('../models/User');
const Subscription = require('../models/Subscription');

// Service to get user profile
const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

// Service to update user subscription
const updateUserSubscription = async (userId, subscriptionType) => {
  const subscription = await Subscription.findOne({ user: userId });
  
  if (!subscription) {
    throw new Error('Subscription not found');
  }

  subscription.type = subscriptionType;
  subscription.endDate = new Date(subscription.endDate.setMonth(subscription.endDate.getMonth() + 1));

  await subscription.save();

  return subscription;
};

module.exports = { getUserProfile, updateUserSubscription };
