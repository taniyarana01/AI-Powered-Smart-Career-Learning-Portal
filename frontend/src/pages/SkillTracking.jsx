import React, { useState, useEffect } from "react";
import "./SkillTracking.css";

const SkillTracking = () => {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("skills")) || [];
    setSkills(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  const addSkill = () => {
    if (!skill.trim()) return;

    setSkills([
      ...skills,
      {
        id: Date.now(),
        name: skill,
        completed: false,
      },
    ]);

    setSkill("");
  };

  const toggleSkill = (id) => {
    setSkills(
      skills.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteSkill = (id) => {
    setSkills(skills.filter((item) => item.id !== id));
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

      <h3>{progress}% Completed</h3>

      <div className="skillList">

        {skills.map((item) => (

          <div className="skillCard" key={item.id}>

            <span
              className={item.completed ? "done" : ""}
            >
              {item.name}
            </span>

            <div>

              <button
                onClick={() => toggleSkill(item.id)}
              >
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

        ))}

      </div>

    </div>
  );
};

export default SkillTracking;