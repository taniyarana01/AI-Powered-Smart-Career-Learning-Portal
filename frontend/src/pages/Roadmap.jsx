import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./Roadmap.css";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export default function Roadmap() {
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("Fresher");
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    if (!role.trim()) {
      alert("Please enter a career role.");
      return;
    }

    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      alert("Gemini API key is missing.");
      return;
    }

    setLoading(true);
    setRoadmap([]);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const prompt = `
You are an expert career mentor.

Create a complete learning roadmap for:

Career Role: ${role}
Experience Level: ${level}

Generate a practical roadmap for a student who wants to become job-ready.

Include these stages:

1. Fundamentals
2. Core Technologies
3. Advanced Skills
4. Projects
5. Interview Preparation
6. Job Preparation

For every stage provide:
- Stage title
- Skills to learn
- Important topics
- Project suggestions
- Expected outcome

Return ONLY valid JSON in this exact structure:

[
  {
    "stage": "Stage Name",
    "skills": ["skill 1", "skill 2"],
    "topics": ["topic 1", "topic 2"],
    "projects": ["project 1", "project 2"],
    "outcome": "Expected outcome"
  }
]

Do not use markdown.
Do not use code blocks.
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsedRoadmap = JSON.parse(cleanedText);

      if (!Array.isArray(parsedRoadmap)) {
        throw new Error("Invalid roadmap format");
      }

      setRoadmap(parsedRoadmap);
    } catch (error) {
      console.error("Roadmap generation error:", error);

      alert(
        "Unable to generate roadmap. Please check your Gemini API key and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="roadmapPage">

      <section className="roadmapHero">
        <span className="roadmapBadge">🤖 AI Powered</span>

        <h1>AI Career Roadmap</h1>

        <p>
          Generate a personalized learning roadmap and become
          job-ready with AI guidance.
        </p>
      </section>

      <section className="roadmapGenerator">

        <div className="inputGroup">
          <label>Career Role</label>

          <input
            type="text"
            placeholder="e.g. Full Stack Developer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="inputGroup">
          <label>Experience Level</label>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option>Fresher</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <button
          className="generateRoadmapBtn"
          onClick={generateRoadmap}
          disabled={loading}
        >
          {loading
            ? "Generating Roadmap..."
            : "🚀 Generate AI Roadmap"}
        </button>

      </section>

      {loading && (
        <div className="loadingBox">
          <div className="loader"></div>

          <h3>AI is creating your roadmap...</h3>

          <p>
            Analyzing skills, technologies and career requirements.
          </p>
        </div>
      )}

      {roadmap.length > 0 && (
        <section className="roadmapResult">

          <div className="resultHeader">
            <h2>🎯 Your Personalized Roadmap</h2>

            <p>
              Roadmap for <strong>{role}</strong>
            </p>
          </div>

          <div className="timeline">

            {roadmap.map((item, index) => (
              <div className="roadmapItem" key={index}>

                <div className="timelineNumber">
                  {index + 1}
                </div>

                <div className="roadmapContent">

                  <span className="stageLabel">
                    STEP {index + 1}
                  </span>

                  <h2>{item.stage}</h2>

                  <div className="roadmapSection">

                    <h3>🧠 Skills to Learn</h3>

                    <div className="tagContainer">
                      {item.skills?.map((skill, i) => (
                        <span className="skillTag" key={i}>
                          {skill}
                        </span>
                      ))}
                    </div>

                  </div>

                  <div className="roadmapSection">

                    <h3>📚 Important Topics</h3>

                    <ul>
                      {item.topics?.map((topic, i) => (
                        <li key={i}>{topic}</li>
                      ))}
                    </ul>

                  </div>

                  <div className="roadmapSection">

                    <h3>💻 Projects</h3>

                    <ul>
                      {item.projects?.map((project, i) => (
                        <li key={i}>{project}</li>
                      ))}
                    </ul>

                  </div>

                  <div className="outcomeBox">
                    <strong>🎯 Expected Outcome</strong>

                    <p>{item.outcome}</p>
                  </div>

                </div>

              </div>
            ))}

          </div>

        </section>
      )}

    </div>
  );
}