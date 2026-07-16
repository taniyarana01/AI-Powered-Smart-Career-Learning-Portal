import express from "express";
import multer from "multer";
import fs from "fs";
import mammoth from "mammoth";
import { pdf } from "pdf-parse";

import User from "../models/User.js";
import Resume from "../models/Resume.js";
import { protect } from "../middleware/authMiddleware.js";

import OpenAI from "openai";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload resume and extract skills

router.post("/upload", protect, upload.single("resume"), async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const userId = req.user.id;
    const filePath = req.file.path;
    const fileType = req.file.mimetype;

    let text = "";

    if (fileType === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const result = await pdf(dataBuffer);
      text = result.text;
    } else if (
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "application/msword"
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } else {
      return res.status(400).json({ error: "Unsupported file format" });
    }

    fs.unlinkSync(filePath); // remove uploaded file

    if (!text.trim()) return res.status(400).json({ error: "No text found in resume" });

    // Extract skills using OpenAI embeddings
  const skills = await extractSkillsNLP(text, openai);

    // Save skills to user
    await User.findByIdAndUpdate(userId, { skills, resumeFile: req.file.originalname });

    res.json({ message: "Resume parsed and saved successfully", skills, wordCount: text.split(/\s+/).length });

  } catch (err) {
    console.error("Resume parsing error:", err.message);
    res.status(500).json({ error: "Failed to parse resume", details: err.message });
  }
});

// NLP-based skill extraction
async function extractSkillsNLP(text, openai) {
  const knownSkills = [
    "JavaScript","Python","React","Node.js","HTML","CSS",
    "MongoDB","Express","SQL","Java","C++","AI","Machine Learning"
  ];

  const response = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: [text, ...knownSkills]
  });

  const textEmbedding = response.data[0].embedding;
  const skillEmbeddings = response.data.slice(1).map(d => d.embedding);

  const matchedSkills = knownSkills.filter((skill, idx) => cosineSimilarity(textEmbedding, skillEmbeddings[idx]) > 0.7);
  return matchedSkills;
}

// Cosine similarity
function cosineSimilarity(vecA, vecB) {
  let dot = 0.0, normA = 0.0, normB = 0.0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function saveResume(req, res) {
  try {
    const {
      name,
      email,
      phone,
      address,
      linkedin,
      github,
      portfolio,
      summary,
      skills,
      education,
      experience,
      projects,
      certifications,
      languages,
    } = req.body;

    const newResume = new Resume({
      userId: req.user.id,
      name,
      email,
      phone,
      address,
      linkedin,
      github,
      portfolio,
      summary,
      skills,
      education,
      experience,
      projects,
      certifications,
      languages,
    });

    await newResume.save();

    res.status(201).json({
      message: "Resume saved successfully",
      resume: newResume,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to save resume",
    });
  }
}
// Save Resume Builder Data
router.post("/save", protect, saveResume);
router.post("/create", protect, saveResume);

    
    
// Get all resumes of logged-in user
router.get("/my", protect, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(resumes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch resumes",
    });
  }
});

// Delete Resume
router.delete("/:id", protect, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    await Resume.findByIdAndDelete(req.params.id);

    res.json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete resume",
    });
  }
});

//edit resume
// Get Single Resume
router.get("/:id", protect, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch resume",
    });
  }
});


// Update Resume
router.put("/:id", protect, async (req, res) => {
  try {
    const {
  name,
  email,
  phone,
  address,
  linkedin,
  github,
  portfolio,
  summary,
  skills,
  education,
  experience,
  projects,
  certifications,
  languages,
} = req.body;

    const updatedResume = await Resume.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      {
  name,
  email,
  phone,
  address,
  linkedin,
  github,
 portfolio,
  summary,
  skills,
  education,
  experience,
  projects,
  certifications,
  languages,
},
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.json({
      message: "Resume updated successfully",
      resume: updatedResume,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update resume",
    });
  }
});
export default router;
