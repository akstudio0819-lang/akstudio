import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending'
    },
  },
  { timestamps: true }
);

export const Consultation = mongoose.model('Consultation', consultationSchema);
