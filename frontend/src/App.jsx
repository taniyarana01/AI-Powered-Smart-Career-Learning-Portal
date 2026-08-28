import Resume from "./pages/Resume";
import ResumeBuilder from "./pages/ResumeBuilder";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import MyResumes from "./pages/MyResumes";
import Profile from "./pages/Profile";
import SmartNotes from "./pages/SmartNotes";
import Roadmap from "./pages/Roadmap";
import MockInterview from "./pages/MockInterview";
import AITutor from "./pages/AITutor";
import SkillTracking from "./pages/SkillTracking";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/resume" element={<Resume />} />

        {/*resumebuilder*/}
        <Route path="/resume-builder" element={<ResumeBuilder />} />
         
         <Route path="/resume-builder/:id" element={<ResumeBuilder />} />

        {/*myresume*/}
        <Route path="/my-resumes" element={<MyResumes />} />

        {/*pages*/}
        <Route path="/profile" element={<Profile />} />

        {/*notes*/}
        <Route path="/smart-notes" element={<SmartNotes />} />

        {/*roadmap*/}
        <Route path="/career-roadmap" element={<Roadmap />} />

        {/*mock interview*/}
        <Route path="/mock-interviews" element={<MockInterview />} />

        {/*ai tutor */}
        <Route path="/ai-tutor" element={<AITutor />} />
         
         {/*skill tracking*/}
         <Route path="/skill-tracking" element={<SkillTracking />} />
      </Routes>
    </BrowserRouter>
  );
}