import { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import "../App.css";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <DashboardNavbar />

      <div className="dashboard">
        <h1>👤 My Profile</h1>

        
          {user && (
  <div className="dashboardCard">

    <h2>{user.name}</h2>

    <p>
      <strong>📧 Email:</strong> {user.email}
    </p>

    <p>
      <strong>👤 Role:</strong> {user.role}
    </p>

    <hr />

    <div className="profileStats">

      <div className="profileBox">
        <h3>📄 Total Resumes</h3>
        <p>1</p>
      </div>

      <div className="profileBox">
        <h3>🎯 Highest ATS Score</h3>
        <p>92 / 100</p>
      </div>

      <div className="profileBox">
        <h3>🤖 AI Analysis</h3>
        <p>Completed</p>
      </div>

    </div>

    <button
      className="dashboardBtn"
      onClick={() => alert("Edit Profile Coming Soon")}
    >
      ✏ Edit Profile
    </button>

  </div>
)}
       
      </div>
    </>
  );
}