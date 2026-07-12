import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../App.css";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ ROADMAP STATES
  const [roadmap, setRoadmap] = useState("");
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);

  const navigate = useNavigate();

  const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);
  // 🤖 AI CHAT (BACKEND)
  
  // ========================
// 🤖 AI CHAT (GEMINI)
// ========================
const handleAskAI = async () => {
  if (!question.trim()) {
    alert("Please enter your question.");
    return;
  }

  setLoading(true);
  setAnswer("");

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert AI Career Assistant.

Help students with:
- Career Guidance
- Coding
- Placements
- Resume
- Interview Preparation
- Learning Roadmaps

Answer in simple and professional points.

Question:
${question}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    setAnswer(response.text());

  } catch (err) {
    console.log(err);
    setAnswer("❌ Failed to generate response.");
  }

  setLoading(false);
};
  // 🛣 ROADMAP AI
  // ========================
  const generateRoadmap = async (role) => {
    try {
      setLoadingRoadmap(true);
      setRoadmap("");

      const res = await API.post("/roadmap", {
        goal: role,
      });

      setRoadmap(res.data.roadmap);
    } catch (err) {
      setRoadmap("Error generating roadmap");
    }

    setLoadingRoadmap(false);
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="nav">
        <h2 className="logo">🤖 AI Learning Portal</h2>

        <div className="navLinks">
          <a href="#features">Features</a>
          <a href="#stats">Stats</a>
          <a href="#ai">AI Assistant</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="btn" onClick={() => navigate("/")}>
          Get Started
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="heroLeft">
          <h1>
            Learn Smarter with <span>Artificial Intelligence</span>
          </h1>

          <p>
            Personalized learning, AI career guidance, smart notes,
            resume analysis and roadmaps.
          </p>

          <div className="heroButtons">
            <button className="primaryBtn">
              Start Learning
            </button>

            <button className="secondaryBtn">
              Explore Features
            </button>
          </div>
        </div>

        <div className="heroRight">
          <div className="dashboardCard">
            <h3>🚀 Student Dashboard</h3>

            <div className="miniCard">
              <span>Course Progress</span>
              <strong>78%</strong>
            </div>

            <div className="miniCard">
              <span>AI Queries</span>
              <strong>156</strong>
            </div>

            <div className="miniCard">
              <span>Resume Score</span>
              <strong>92/100</strong>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <h2>Our Features</h2>

        <div className="grid">
          <div className="card" onClick={() => navigate("/smart-notes")}>
            <h3>📚 Smart Notes</h3>
            <p>Generate AI-powered notes instantly.</p>
          </div>

          <div className="card" onClick={() => navigate("/ai-tutor")}>
            <h3>🤖 AI Tutor</h3>
            <p>Get personalized guidance anytime.</p>
          </div>

          <div className="card" onClick={() => navigate("/career-roadmap")}>
            <h3>🛣 Career Roadmap</h3>
            <p>Build a complete learning path.</p>
          </div>

          <div className="card" onClick={() => navigate("/skill-tracking")}>
            <h3>📈 Skill Tracking</h3>
            <p>Track progress and growth.</p>
          </div>

          <div className="card" onClick={() => navigate("/resume-analyzer")}>
            <h3>📄 Resume Analyzer</h3>
            <p>Improve your resume using AI.</p>
          </div>

          <div className="card" onClick={() => navigate("/mock-interviews")}>
            <h3>🎯 Mock Interviews</h3>
            <p>Prepare for placements confidently.</p>
          </div>
        </div>
      </section>

      {/* CAREER ROADMAP (🔥 NOW AI POWERED) */}
      <section className="careerSection" id="roadmap">
        <h2>🎯 Career Roadmaps (AI Powered)</h2>

        <div className="roadmapGrid">

          <div
            className="roadmapCard"
            onClick={() => generateRoadmap("Frontend Developer")}
            style={{ cursor: "pointer" }}
          >
            <h3>Frontend Developer</h3>
            <p>HTML → CSS → JS → React → Next.js</p>
          </div>

          <div
            className="roadmapCard"
            onClick={() => generateRoadmap("Full Stack Developer")}
            style={{ cursor: "pointer" }}
          >
            <h3>Full Stack Developer</h3>
            <p>React → Node → MongoDB → Deployment</p>
          </div>

          <div
            className="roadmapCard"
            onClick={() => generateRoadmap("AI Engineer")}
            style={{ cursor: "pointer" }}
          >
            <h3>AI Engineer</h3>
            <p>Python → ML → Deep Learning → GenAI</p>
          </div>

        </div>

        {/* ROADMAP OUTPUT */}
        {loadingRoadmap && <p>Generating roadmap...</p>}

        {roadmap && (
          <div style={{ marginTop: "20px" }}>
            <h3>🚀 AI Generated Roadmap</h3>
            <pre>{roadmap}</pre>
          </div>
        )}
      </section>
       
       {/* STATS */}

<section className="statsSection" id="stats">

<h2>📊 Platform Statistics</h2>

<div className="statsGrid">

<div className="statCard">
<h3>5000+</h3>
<p>Students</p>
</div>

<div className="statCard">
<h3>1200+</h3>
<p>AI Notes Generated</p>
</div>

<div className="statCard">
<h3>950+</h3>
<p>Resume Analysis</p>
</div>

<div className="statCard">
<h3>300+</h3>
<p>Mock Interviews</p>
</div>

</div>

</section>
      {/* COURSES */}
      <section className="coursesSection" id="courses">
        <h2>📚 Popular Learning Paths</h2>

        <div className="courseGrid">
          <div className="courseCard">
            <h3>Frontend Development</h3>
            <p>Master React, Next.js and modern UI development.</p>
            <button onClick={() => navigate("/courses/frontend")}>
              Start Course
            </button>
          </div>

          <div className="courseCard">
            <h3>Full Stack Development</h3>
            <p>Learn MERN stack and build real-world projects.</p>
            <button onClick={() => navigate("/courses/fullstack")}>
              Start Course
            </button>
          </div>

          <div className="courseCard">
            <h3>Artificial Intelligence</h3>
            <p>Explore ML, Deep Learning and Generative AI.</p>
            <button onClick={() => navigate("/courses/ai")}>
              Start Course
            </button>
          </div>
        </div>
      </section>

      {/* AI ASSISTANT (BACKEND CONNECTED) */}
      <section className="aiBox" id="ai">
        <h2>🤖 AI Career Assistant</h2>

        <div className="chatBox">
          {question && (
            <div className="msg user">
              <strong>You:</strong> {question}
            </div>
          )}

          {loading ? (
            <div className="msg ai">Thinking...</div>
          ) : (
            answer && (
              <div className="msg ai">
  <strong>🤖 AI Assistant</strong>

  <pre
    style={{
      whiteSpace: "pre-wrap",
      marginTop: "10px",
      lineHeight: "1.8",
      fontFamily: "inherit",
    }}
  >
    {answer}
  </pre>
</div>
            )
          )}
        </div>

        <div className="inputBox">
          <input
            type="text"
            placeholder="Ask about careers, coding, placements..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button onClick={handleAskAI}>
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <h2>📞 Contact Us</h2>

<p>📧 Email: support@ailearningportal.com</p>

<p>📱 Phone: +91 9876543210</p>

<p>📍 Roorkee, Uttarakhand</p>
        <h3>AI Powered Smart Learning Portal</h3>
        <p>Empowering students through Artificial Intelligence.</p>
        <p>© 2026 All Rights Reserved</p>
      </footer>

    </div>
  );
}