import React, { useState } from "react";
import "./SmartNotes.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const SmartNotes = () => {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const generateNotes = async () => {
    if (!subject || !topic) {
      alert("Please enter Subject and Topic");
      return;
    }

    setLoading(true);
    setNotes("");

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const prompt = `
You are an expert teacher.

Generate detailed study notes.

Subject: ${subject}
Topic: ${topic}

Include:
1. Introduction
2. Definition
3. Detailed Explanation
4. Key Points
5. Real Life Example
6. Advantages
7. Disadvantages
8. Interview Questions
9. Summary

Return the response in proper markdown format.
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setNotes(text);
    } catch (error) {
      console.log(error);
      setNotes("❌ Failed to generate notes.");
    }

    setLoading(false);
  };

  return (
    <div className="notesPage">
      <div className="notesHero">
        <h1>📚 AI Smart Notes</h1>
        <p>Generate detailed study notes instantly using Gemini AI.</p>
      </div>

      <div className="notesCard">
        <input
          type="text"
          placeholder="Enter Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <button onClick={generateNotes}>
          {loading ? "Generating..." : "Generate AI Notes"}
        </button>
      </div>

      {notes && (
        <div className="outputCard">
          <h2>Generated Notes</h2>

          <pre>{notes}</pre>
        </div>
      )}
    </div>
  );
};

export default SmartNotes;