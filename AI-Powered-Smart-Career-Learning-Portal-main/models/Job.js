import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skillsRequired: { type: [String], default: [] },
  company: { type: String, required: true },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Job", jobSchema);
