import React, { useState } from "react";
import "./AITutor.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const AITutor = () => {

  const [topic, setTopic] = useState("");
  const [lesson, setLesson] = useState("");
  const [loading, setLoading] = useState(false);

  const generateLesson = async () => {

    if (!topic) {
      alert("Please enter a topic");
      return;
    }

    setLoading(true);
    setLesson("");

    try {

      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const prompt = `
You are an expert AI Tutor.

Teach this topic:

${topic}

Return in beautiful markdown format.

Include:

# 📘 Introduction

# 💡 Easy Explanation

# 🔑 Key Points

# 💻 Example

# 👨‍💻 Code Example (if applicable)

# ❓ Quiz (5 Questions)

# 🎯 Interview Questions

# 📚 Learning Resources
`;

      const result = await model.generateContent(prompt);

      const response = await result.response;

      setLesson(response.text());

    } catch (err) {

      console.log(err);

      setLesson("Failed to generate lesson.");

    }

    setLoading(false);

  };

  return (

    <div className="tutorPage">

      <div className="tutorHero">

        <h1>🤖 AI Tutor</h1>

        <p>
          Learn any topic with Gemini AI
        </p>

      </div>

      <div className="tutorCard">

        <input
          type="text"
          placeholder="React Hooks"
          value={topic}
          onChange={(e)=>setTopic(e.target.value)}
        />

        <button onClick={generateLesson}>

          {loading
            ? "Generating..."
            : "Generate Lesson"}

        </button>

      </div>

      {lesson && (

        <div className="lessonCard">

          <pre>

            {lesson}

          </pre>

        </div>

      )}

    </div>

  );

};

export default AITutor;