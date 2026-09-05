import { Message } from '../models/Message.js';

export const getMessages = async (req, res) => {
  const { user } = req.query;
  try {
    const filter = user ? { $or: [{ sender: user }, { receiver: user }] } : {};
    const messages = await Message.find(filter).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    const created = await message.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
