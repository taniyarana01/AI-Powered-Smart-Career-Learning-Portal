import React, { useState } from "react";
import "./Roadmap.css";

const roadmapData = {
  frontend: {
    title: "Frontend Developer",
    salary: "₹4 - ₹15 LPA",
    beginner: ["HTML5", "CSS3", "JavaScript", "Git & GitHub"],
    intermediate: ["React.js", "React Router", "Redux Toolkit", "REST APIs"],
    advanced: ["Next.js", "TypeScript", "Testing", "Deployment"],
    projects: [
      "Portfolio Website",
      "Netflix Clone",
      "E-Commerce Website",
      "Admin Dashboard",
    ],
    resources: ["MDN Docs", "freeCodeCamp", "React Official Docs"],
    interview: [
      "HTML/CSS",
      "JavaScript",
      "React",
      "Projects Discussion",
    ],
  },

  fullstack: {
    title: "Full Stack Developer",
    salary: "₹6 - ₹20 LPA",
    beginner: ["HTML", "CSS", "JavaScript", "Git"],
    intermediate: ["React", "Node.js", "Express", "MongoDB"],
    advanced: ["JWT", "Docker", "AWS", "System Design"],
    projects: ["Chat App", "LMS", "Job Portal", "E-Commerce"],
    resources: ["MongoDB Docs", "Node Docs", "React Docs"],
    interview: [
      "MERN Stack",
      "DBMS",
      "Authentication",
      "REST APIs",
    ],
  },

  ai: {
    title: "AI Engineer",
    salary: "₹8 - ₹30 LPA",
    beginner: ["Python", "NumPy", "Pandas", "Maths"],
    intermediate: [
      "Machine Learning",
      "Scikit Learn",
      "TensorFlow",
    ],
    advanced: [
      "Deep Learning",
      "LLMs",
      "LangChain",
      "Generative AI",
    ],
    projects: [
      "Chatbot",
      "Resume Analyzer",
      "AI Notes Generator",
      "Image Classifier",
    ],
    resources: [
      "Kaggle",
      "TensorFlow",
      "HuggingFace",
    ],
    interview: [
      "ML",
      "Deep Learning",
      "NLP",
      "GenAI",
    ],
  },
};

export default function Roadmap() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="roadmapPage">
      <section className="hero">
        <h1>🚀 Career Roadmaps</h1>
        <p>
          Select your dream career and explore a complete learning path from
          beginner to professional.
        </p>
      </section>

      <div className="careerGrid">
        <div
          className="careerCard"
          onClick={() => setSelected(roadmapData.frontend)}
        >
          <h2>🌐 Frontend Developer</h2>
          <p>HTML • CSS • JavaScript • React</p>
          <button>View Roadmap</button>
        </div>

        <div
          className="careerCard"
          onClick={() => setSelected(roadmapData.fullstack)}
        >
          <h2>💻 Full Stack Developer</h2>
          <p>MERN Stack Development</p>
          <button>View Roadmap</button>
        </div>

        <div
          className="careerCard"
          onClick={() => setSelected(roadmapData.ai)}
        >
          <h2>🤖 AI Engineer</h2>
          <p>ML • Deep Learning • GenAI</p>
          <button>View Roadmap</button>
        </div>
      </div>

      {selected && (
        <div className="roadmapBox">
          <h1>{selected.title}</h1>

          <div className="salary">
            💰 Average Salary : {selected.salary}
          </div>

          <div className="section">
            <h2>🟢 Beginner</h2>
            <ul>
              {selected.beginner.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="section">
            <h2>🔵 Intermediate</h2>
            <ul>
              {selected.intermediate.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="section">
            <h2>🟣 Advanced</h2>
            <ul>
              {selected.advanced.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="section">
            <h2>🚀 Projects</h2>
            <ul>
              {selected.projects.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="section">
            <h2>📚 Resources</h2>
            <ul>
              {selected.resources.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="section">
            <h2>💼 Interview Preparation</h2>
            <ul>
              {selected.interview.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <button
            className="closeBtn"
            onClick={() => setSelected(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}