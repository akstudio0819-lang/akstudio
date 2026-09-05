import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    client: { type: String, required: true },
    industry: { type: String, required: true },
    services: [{ type: String }],
    technologies: [{ type: String }],
    thumbnail: { type: String, required: true },
    gallery: [{ type: String }],
    challenge: { type: String },
    solution: { type: String },
    results: { type: String },
    status: { 
      type: String, 
      enum: ['Inquiry', 'Planning', 'Design', 'Development', 'Testing', 'Completed'],
      default: 'Inquiry'
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
