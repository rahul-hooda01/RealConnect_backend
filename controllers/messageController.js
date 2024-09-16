const Message = require('../models/Message');

// Send Message
const sendMessage = async (req, res) => {
  const { receiverId, content, propertyId } = req.body;
  try {
    const message = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      content,
      property: propertyId,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Messages Between Users
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    }).populate('sender receiver', 'name email');

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendMessage, getMessages };
