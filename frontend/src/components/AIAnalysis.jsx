import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { resumeData } from "../data/resumeData";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const AIAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});
      

      const prompt = `
You are an expert ATS resume analyzer.

Return ONLY valid JSON:

{
  "atsScore": number,
  "strengths": [],
  "improvements": [],
  "recommendedJobs": [],
  "learningPath": []
}

Resume:
Name: ${resumeData?.name}
Skills: ${resumeData?.skills}
Projects: ${resumeData?.projects}
Experience: ${resumeData?.experience}
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch (e) {
        console.log("Raw AI Response:", text);

        data = {
          atsScore: 70,
          strengths: ["Good profile"],
          improvements: ["Improve formatting"],
          recommendedJobs: ["Frontend Developer"],
          learningPath: ["React"],
        };
      }

      setResult(data);
    } catch (error) {
      console.log("AI Error:", error);
    }

    setLoading(false);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={handleAnalyze}>
        🤖 Analyze with AI
      </button>

      {loading && <p>Analyzing resume...</p>}

      {result && (
        <div style={{ marginTop: "15px" }}>
          <h3>ATS Score: {result.atsScore}/100</h3>

          <h4>Strengths</h4>
          <ul>
            {result.strengths.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4>Improvements</h4>
          <ul>
            {result.improvements.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4>Recommended Jobs</h4>
          <ul>
            {result.recommendedJobs.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4>Learning Path</h4>
          <ul>
            {result.learningPath.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;