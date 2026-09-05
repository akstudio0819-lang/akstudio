import { Contact } from '../models/Contact.js';
import { sendProjectRequestEmail } from '../services/emailService.js';

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const created = await contact.save();

    // Trigger Email notification to akstudio0819@gmail.com
    await sendProjectRequestEmail(req.body);

    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Contact enquiry not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Contact enquiry not found' });
    }
    res.json({ message: 'Contact enquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
