// Load environment variables first
import dotenv from "dotenv";
dotenv.config();

//console.log(
  //"GEMINI KEY:",
 // process.env.GEMINI_API_KEY ? "LOADED ✅" : "MISSING ❌"
//);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import resumeRoutes from "./routes/resumeRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Powered Smart Career Learning Portal Backend is Running 🚀");
});

// Existing routes
app.use("/api/resume", resumeRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });