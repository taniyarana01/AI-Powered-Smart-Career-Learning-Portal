import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>🤖</span>
        AI Learning Portal
      </div>

      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#courses">Courses</a></li>
        <li><a href="#roadmap">Roadmap</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#stats">Stats</a></li>
        
      </ul>

      <div className="nav-buttons">
        <Link to="/login" className="login-btn">
          Login
        </Link>

        <Link to="/signup" className="signup-btn">
          Get Started
        </Link>
      </div>
    </nav>
  );
}