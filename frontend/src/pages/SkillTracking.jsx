import React, { useState, useEffect } from "react";
import "./SkillTracking.css";

const SkillTracking = () => {
  const [skill, setSkill] = useState("");

  const [skills, setSkills] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("skills")) || [];
    } catch (error) {
      console.error("Failed to load skills:", error);
      return [];
    }
  });

  // Save skills whenever they change
  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  const addSkill = () => {
    if (!skill.trim()) return;

    const newSkill = {
      id: Date.now(),
      name: skill.trim(),
      completed: false,
    };

    setSkills((prevSkills) => [...prevSkills, newSkill]);
    setSkill("");
  };

  const toggleSkill = (id) => {
    setSkills((prevSkills) =>
      prevSkills.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteSkill = (id) => {
    setSkills((prevSkills) =>
      prevSkills.filter((item) => item.id !== id)
    );
  };

  const completed = skills.filter((s) => s.completed).length;

  const progress =
    skills.length === 0
      ? 0
      : Math.round((completed / skills.length) * 100);

  return (
    <div className="skillPage">
      <h1>📈 Skill Tracker</h1>

      <div className="skillInput">
        <input
          type="text"
          placeholder="Enter Skill..."
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addSkill();
            }
          }}
        />

        <button onClick={addSkill}>
          Add Skill
        </button>
      </div>

      <div className="progressBar">
        <div
          className="progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <h3>
        {progress}% Completed
      </h3>

      <div className="skillList">
        {skills.length === 0 ? (
          <p style={{ textAlign: "center", color: "#64748b" }}>
            No skills added yet. Start tracking your learning progress!
          </p>
        ) : (
          skills.map((item) => (
            <div className="skillCard" key={item.id}>
              <span className={item.completed ? "done" : ""}>
                {item.name}
              </span>

              <div>
                <button onClick={() => toggleSkill(item.id)}>
                  {item.completed ? "Undo" : "Done"}
                </button>

                <button
                  className="delete"
                  onClick={() => deleteSkill(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillTracking;