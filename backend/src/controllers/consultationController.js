import { Consultation } from '../models/Consultation.js';

export const getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    res.json(consultations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createConsultation = async (req, res) => {
  try {
    const consultation = new Consultation(req.body);
    const created = await consultation.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateConsultationStatus = async (req, res) => {
  try {
    const updated = await Consultation.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Consultation request not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
