import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      
      console.log(response.status);
       console.log(data);

      if (!response.ok) {
        alert(data.message || "Login Failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful 🎉");
      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="authBtn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}