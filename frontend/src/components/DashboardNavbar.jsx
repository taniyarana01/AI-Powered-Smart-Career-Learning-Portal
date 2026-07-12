import { useNavigate } from "react-router-dom";

export default function DashboardNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully 👋");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/dashboard")}
      >
        🤖 AI Learning Portal
      </div>

      <div className="nav-buttons">
        <button
          className="login-btn"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        <button
          className="login-btn"
          onClick={() => navigate("/my-resumes")}
        >
          My Resumes
        </button>
          
          <button
          className="login-btn"
          onClick={() => navigate("/profile")}
          >
           My Profile
          </button>

        <button
          className="signup-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}