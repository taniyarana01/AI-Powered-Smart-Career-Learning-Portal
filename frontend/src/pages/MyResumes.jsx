import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

export default function MyResumes() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchResumes = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/resume/my",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResumes(data);
        setError("");
      } else {
        setError(data.message || "Failed to fetch resumes");
        setResumes([]);
      }
    } catch (err) {
      console.error(err);
      setError("Server Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/resume/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setResumes((prev) =>
        prev.filter((r) => r._id !== id)
      );

    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboardHeader">
        <h1>📄 My Resumes</h1>
        <p>Manage, edit and download your resumes</p>
      </div>

      {/* Create Button */}
      <button
        className="dashboardBtn"
        onClick={() => navigate("/resume-builder")}
        style={{ marginBottom: "25px" }}
      >
        ➕ Create New Resume
      </button>

      {/* Loading */}
      {loading && <p>Loading resumes...</p>}

      {/* Error */}
      {error && (
        <p style={{ color: "#ef4444" }}>{error}</p>
      )}

      {/* Empty State */}
      {!loading && resumes.length === 0 && !error && (
        <p style={{ color: "#94a3b8" }}>
          No resumes found. Create your first resume 🚀
        </p>
      )}

      {/* Grid */}
      <div className="dashboardGrid">

        {resumes.map((resume) => (
          <div
            className="dashboardStatCard"
            key={resume._id}
          >
            <h3>{resume.name}</h3>

            <p><strong>Email:</strong> {resume.email}</p>
            <p><strong>Skills:</strong> {resume.skills}</p>
            <p><strong>Education:</strong> {resume.education}</p>
            <p><strong>Experience:</strong> {resume.experience}</p>

            <div className="dashboardActions">

              <button
                className="dashboardBtn"
                onClick={() =>
                  navigate(`/resume-builder/${resume._id}`)
                }
              >
                ✏️ Edit
              </button>

              <button
                className="dashboardBtn"
                onClick={() => handleDelete(resume._id)}
                style={{
                  background:
                    "linear-gradient(135deg,#ef4444,#f97316)"
                }}
              >
                🗑️ Delete
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}