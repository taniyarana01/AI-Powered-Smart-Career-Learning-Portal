import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Protect Route
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token === "null") {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch User Data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
    <DashboardNavbar />

    <div className="dashboard">
      <h1>👋 Welcome to Smart Career Learning Portal</h1>

<p>
Build ATS-friendly resumes, analyze them with AI, download professional PDFs,
and get career recommendations.
</p>

      {/* Action Buttons */}
      <div className="dashboardActions">
        <button
          className="dashboardBtn"
          onClick={() => navigate("/resume-builder")}
        >
          Create Resume
        </button>

        <button
  className="dashboardBtn"
  onClick={() => navigate("/my-resumes")}
>
  My Resumes
</button>

        <button
  className="dashboardBtn"
  onClick={() => navigate("/resume-builder")}
>
  🤖 AI Resume Analysis
</button>
      </div>

      {/* User Info */}
      {user && (
        <div style={{ marginBottom: "20px" }}>
          <h2>Hello, {user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}

      {/* Dashboard Cards */}
      <div className="dashboardGrid">

  <div className="dashboardStatCard">
    <h3>📄 Total Resumes</h3>
    <p>Manage all your resumes</p>
  </div>

  <div className="dashboardStatCard">
    <h3>🤖 AI Resume Analysis</h3>
    <p>Analyze resume with ATS</p>
  </div>

  <div className="dashboardStatCard">
    <h3>🎯 Latest ATS Score</h3>
    <p>92 / 100</p>
  </div>

  <div className="dashboardStatCard">
    <h3>💼 Career Goal</h3>
    <p>MERN Stack Developer</p>
  </div>

</div>
          
      
        </div>
  </>
);
}