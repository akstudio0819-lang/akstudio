import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    businessName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    profileImage: { type: String, default: '' },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Review = mongoose.model('Review', reviewSchema);
