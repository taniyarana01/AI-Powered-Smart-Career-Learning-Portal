import "./App.css";

export default function App() {
  return (
    <div className="app">

      {/* NAV */}
      <div className="nav">
        <h2>AI Learning Portal</h2>
        <button className="btn">Get Started</button>
      </div>

      {/* HERO */}
      <div className="hero">
        <h1>
          AI Powered Smart Learning Platform 🚀
        </h1>

        <p>
          Learn smarter with AI-driven roadmaps, notes, and career guidance.
        </p>

        <button className="primaryBtn">
          Start Learning
        </button>
      </div>

      {/* FEATURES */}
      <div className="grid">
        <div className="card">📚 Smart Notes</div>
        <div className="card">🤖 AI Tutor</div>
        <div className="card">📈 Career Roadmap</div>
        <div className="card">🧠 Skill Tracking</div>
      </div>

      {/* AI SECTION */}
      <div className="aiBox">
  <h2>🤖 AI Assistant</h2>

  <div className="chatBox">
    <div className="msg user">You: How to become a developer?</div>
    <div className="msg ai">AI: Start with HTML → CSS → JS → React 🚀</div>
  </div>

  <div className="inputBox">
    <input placeholder="Ask your doubt..." />
    <button>Send</button>
  </div>
</div>

        

      {/* FOOTER */}
      <div className="footer">
        © 2026 AI Learning Portal
      </div>

    </div>
  );
}
