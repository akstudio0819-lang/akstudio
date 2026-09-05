import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    service: { type: String, required: true },
    budget: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'contacted', 'converted', 'cancelled'],
      default: 'pending'
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model('Contact', contactSchema);
