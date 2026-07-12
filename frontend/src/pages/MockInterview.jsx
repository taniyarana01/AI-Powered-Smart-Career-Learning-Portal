import React, { useState } from "react";
import "./MockInterview.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const MockInterview = () => {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("Fresher");

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);

  const [feedback, setFeedback] = useState("");
const [score, setScore] = useState(0);
const [checking, setChecking] = useState(false);

const [scores, setScores] = useState([]);
const [completed, setCompleted] = useState(false);

const overallScore =
  scores.length > 0
    ? Math.round(
        (scores.reduce((a, b) => a + b, 0) / (questions.length * 10)) * 100
      )
    : 0;

  const generateInterview = async () => {
    if (!role) {
      alert("Enter Job Role");
      return;
    }

    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const prompt = `
Generate ONLY 10 interview questions.

Role: ${role}
Experience: ${experience}

Rules:
- Return one question per line.
- Do NOT give answers.
- Mix HR + Technical + Scenario questions.
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;

      const text = response.text();

      const list = text
        .split("\n")
        .filter((q) => q.trim() !== "");

      setQuestions(list);
      setCurrentQuestion(0);

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };
   
  const evaluateAnswer = async () => {

  if (!answer.trim()) {
    alert("Please write your answer first.");
    return;
  }

  setChecking(true);
  setFeedback("");

  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert interviewer.

Question:
${questions[currentQuestion]}

Candidate Answer:
${answer}

Evaluate professionally.

Return exactly in this format:

Score: x/10

Strengths:
- ...

Weaknesses:
- ...

Ideal Answer:
...
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    setFeedback(text);

    const match = text.match(/Score:\s*(\d+)/i);

    let marks = 0;

    if(match){
      marks = Number(match[1]);
    }

    setScore(marks);

    const temp = [...scores];

    temp[currentQuestion] = marks;

    setScores(temp);

  } catch(err){

    console.log(err);

    setFeedback("Evaluation Failed");

  }

  setChecking(false);

};
  
  const nextQuestion = () => {

  if(currentQuestion<questions.length-1){

      setCurrentQuestion(currentQuestion+1);

      setAnswer("");

      setFeedback("");

  }

  else{

      setCompleted(true);

  }

};

  return (
    <div className="mockPage">

      <div className="mockHero">
        <h1>🎤 AI Mock Interview</h1>
        <p>Practice interviews with Gemini AI</p>
      </div>

      <div className="mockCard">

        <input
          type="text"
          placeholder="Frontend Developer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        >
          <option>Fresher</option>
          <option>1-2 Years</option>
          <option>3-5 Years</option>
          <option>5+ Years</option>
        </select>

        <button onClick={generateInterview}>
          {loading ? "Generating..." : "Generate Interview"}
        </button>

      </div>

      {completed && (

<div className="resultCard">

<h1>🎉 Interview Completed</h1>

<div className="scoreCircle">

<h2>{overallScore}%</h2>

<p>Overall Score</p>

</div>

<div className="summary">

<h2>Interview Summary</h2>

<p>Role : <b>{role}</b></p>

<p>Experience : <b>{experience}</b></p>

<p>Questions : <b>{questions.length}</b></p>

<p>Average Score : <b>{overallScore}/100</b></p>

</div>

<div className="strengthCard">

<h2>Performance</h2>

<ul>

{scores.map((s,index)=>(

<li key={index}>

Question {index+1}

<span>{s}/10</span>

</li>

))}

</ul>

</div>

</div>

)}




          {questions.length > 0 && (
  <div className="questionBox">

    <div className="progress">
      <div
        className="progressFill"
        style={{
          width: `${((currentQuestion + 1) / questions.length) * 100}%`,
        }}
      ></div>
    </div>

    <h2>
      Question {currentQuestion + 1} / {questions.length}
    </h2>

    <h3 className="questionText">
      {questions[currentQuestion]}
    </h3>

    <textarea
      className="answerBox"
      rows="8"
      placeholder="Write your answer here..."
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
    />

    <button
      className="evaluateBtn"
      onClick={evaluateAnswer}
    >
      {checking ? "Evaluating..." : "🤖 Evaluate Answer"}
    </button>

    {feedback && (
      <div className="feedbackCard">
        <h2>AI Feedback</h2>
        <h3>⭐ Score : {score}/10</h3>
        <pre>{feedback}</pre>
      </div>
    )}

    <button
      className="nextBtn"
      onClick={nextQuestion}
    >
      {currentQuestion === questions.length - 1
        ? "Finish Interview 🎉"
        : "Next Question →"}
    </button>

  </div>
)}

</div>

);
};

export default MockInterview;