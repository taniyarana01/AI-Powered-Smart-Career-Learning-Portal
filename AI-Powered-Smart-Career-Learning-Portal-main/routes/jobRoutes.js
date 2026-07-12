import express from "express";
import Job from "../models/Job.js";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import OpenAI from "openai";

const router = express.Router();

// ✅ Add Job (with NLP skill extraction)
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, company, location } = req.body;
    if (!title || !description || !company)
      return res.status(400).json({ message: "Title, company, and description are required" });

    const skillsRequired = await extractSkillsNLP(description);
    const job = await Job.create({ title, description, company, location, skillsRequired });

    res.status(201).json({ message: "Job created successfully", job });
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({ message: "Error creating job", details: err.message });
  }
});

// ✅ Get Recommended Jobs for Logged-in User
router.get("/recommend", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.skills)
      return res.status(400).json({ message: "User has no skills. Upload resume first." });

    const jobs = await Job.find({});
    const recommendations = [];

    for (const job of jobs) {
      const matchPercentage = await calculateJobMatch(user.skills, job.skillsRequired);
      if (matchPercentage > 0)
        recommendations.push({
          jobId: job._id,
          title: job.title,
          company: job.company,
          matchPercentage,
        });
    }

    recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);
    res.json({ total: recommendations.length, recommendations });
  } catch (err) {
    console.error("Error fetching recommendations:", err);
    res.status(500).json({ message: "Error fetching recommendations", details: err.message });
  }
});

// 🧠 Extract Skills using OpenAI Embeddings
async function extractSkillsNLP(text) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const knownSkills = [
    "JavaScript", "Python", "React", "Node.js", "HTML", "CSS",
    "MongoDB", "Express", "SQL", "Java", "C++",
    "Machine Learning", "AI", "Deep Learning", "Data Science",
    "TensorFlow", "Keras", "Cloud", "DevOps", "Docker", "AWS",
  ];

  const response = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: [text, ...knownSkills],
  });

  const textEmbedding = response.data[0].embedding;
  const skillEmbeddings = response.data.slice(1).map((d) => d.embedding);

  return knownSkills.filter(
    (skill, idx) => cosineSimilarity(textEmbedding, skillEmbeddings[idx]) > 0.75
  );
}

// 📊 Cosine Similarity Helper
function cosineSimilarity(vecA, vecB) {
  let dot = 0.0, normA = 0.0, normB = 0.0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// 📈 Job Matching Function
async function calculateJobMatch(userSkills, jobSkills) {
  if (!Array.isArray(userSkills) || !Array.isArray(jobSkills) || jobSkills.length === 0)
    return 0;

  const matched = userSkills.filter((skill) =>
    jobSkills.some((reqSkill) => reqSkill.toLowerCase() === skill.toLowerCase())
  );

  return Math.round((matched.length / jobSkills.length) * 100);
}

export default router;
