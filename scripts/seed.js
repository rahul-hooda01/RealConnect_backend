const mongoose = require('mongoose');
const User = require('../models/User');
const Property = require('../models/Property.js');
const Subscription = require('../models/Subscription');
const connectDB = require('../config/db');

// Seed initial users, properties, and subscriptions
const seedData = async () => {
  try {
    await connectDB();

    // Clear collections
    await User.deleteMany();
    await Property.deleteMany();
    await Subscription.deleteMany();

    // Create initial users
    const users = [
      { name: 'Admin User', email: 'admin@example.com', password: '123456', role: 'admin' },
      { name: 'Agent One', email: 'agent1@example.com', password: '123456' },
      { name: 'Agent Two', email: 'agent2@example.com', password: '123456' },
    ];
    const createdUsers = await User.insertMany(users);

    // Create properties
    const properties = [
      { title: '2BHK Apartment', location: 'New York', price: 1500, bedrooms: 2, listedBy: createdUsers[1]._id },
      { title: '3BHK Villa', location: 'Los Angeles', price: 3000, bedrooms: 3, listedBy: createdUsers[2]._id },
    ];
    await Property.insertMany(properties);

    // Create subscriptions
    const subscriptions = [
      { user: createdUsers[1]._id, type: 'Basic', endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)) },
      { user: createdUsers[2]._id, type: 'Premium', endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)) },
    ];
    await Subscription.insertMany(subscriptions);

    console.log('Data seeding completed');
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
