const Message = require('../models/Message');

// Service to send a message
const sendMessage = async (senderId, receiverId, content, propertyId) => {
  const message = await Message.create({
    sender: senderId,
    receiver: receiverId,
    content,
    property: propertyId,
  });

  return message;
};

// Service to get all messages of a user
const getMessages = async (userId) => {
  const messages = await Message.find({
    $or: [{ sender: userId }, { receiver: userId }],
  }).populate('sender receiver', 'name email');

  return messages;
};

module.exports = { sendMessage, getMessages };
