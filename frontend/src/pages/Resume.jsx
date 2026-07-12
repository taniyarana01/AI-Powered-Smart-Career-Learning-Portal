import { useState } from "react";
import "../App.css";

export default function Resume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume first.");
      return;
    }

    setLoading(true);

    // Abhi sirf demo
    setTimeout(() => {
      setResult(
        "Resume uploaded successfully.\n\nDetected Skills:\n• React\n• JavaScript\n• Node.js\n• MongoDB\n\nResume Score: 88/100"
      );
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="resumePage">
      <h1>📄 AI Resume Analyzer</h1>

      <p>Upload your resume and get AI-powered feedback.</p>

      <div className="resumeCard">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={handleUpload}>
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>

      <div className="resultCard">
        <h3>Analysis Result</h3>

        <pre style={{ whiteSpace: "pre-wrap" }}>
          {result || "Upload a resume to view AI suggestions here."}
        </pre>
      </div>
    </div>
  );
}