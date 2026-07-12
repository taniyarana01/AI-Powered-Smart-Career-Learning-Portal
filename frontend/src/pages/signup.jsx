import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          role: "student",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup Failed");
        return;
      }

      alert("Signup Successful ✔️");

      setName("");
      setEmail("");
      setPassword("");

      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <h1>Create Account 🚀</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="authBtn" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>
  );
}