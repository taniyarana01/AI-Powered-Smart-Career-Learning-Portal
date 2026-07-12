import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  degree: String,
  institute: String,
  year: String,
  cgpa: String,
});

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  duration: String,
  description: String,
});

const projectSchema = new mongoose.Schema({
  title: String,
  technologies: String,
  description: String,
  github: String,
  demo: String,
});

const certificationSchema = new mongoose.Schema({
  name: String,
  organization: String,
  year: String,
});

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Personal Info
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: String,

    address: String,

    linkedin: String,

    github: String,

    portfolio: String,

    summary: String,

    // Arrays
    skills: {
  type: String,
  default: "",
},

education: {
  type: String,
  default: "",
},

experience: {
  type: String,
  default: "",
},

projects: {
  type: String,
  default: "",
},

certifications: {
  type: String,
  default: "",
},

languages: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resume", resumeSchema);