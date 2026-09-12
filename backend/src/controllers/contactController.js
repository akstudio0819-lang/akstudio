import { sendProjectRequestEmail } from '../services/emailService.js';

export const getContacts = async (req, res) => {
  res.json({ message: 'Use Supabase contacts table' });
};

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    // Trigger Email notification to akstudio0819@gmail.com
    const result = await sendProjectRequestEmail(req.body);

    res.status(201).json({
      success: true,
      message: 'Project request received and email sent',
      result
    });
  } catch (error) {
    console.error('Error in createContact controller:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateContactStatus = async (req, res) => {
  res.json({ success: true });
};

export const deleteContact = async (req, res) => {
  res.json({ success: true });
};
