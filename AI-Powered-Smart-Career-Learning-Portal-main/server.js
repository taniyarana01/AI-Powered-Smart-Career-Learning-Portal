// Load environment variables at the very top
import dotenv from "dotenv";
dotenv.config();

  console.log("KEY:", process.env.GEMINI_API_KEY);

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

// Routes
app.use("/api/resume", resumeRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); 

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    console.log("ROADMAP ROUTE LOADED");
  

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });