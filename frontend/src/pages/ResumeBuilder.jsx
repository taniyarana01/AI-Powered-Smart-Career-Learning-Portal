import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AIAnalysis from "../components/AIAnalysis";
import html2pdf from "html2pdf.js";

import "../App.css";

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  address: "",
  linkedin: "",
  github: "",
  portfolio: "",
  summary: "",
  skills: "",
  education: "",
  experience: "",
  projects: "",
  certifications: "",
  languages: "",
});

  // fetch resume (edit mode)
  const fetchResume = async () => {
    if (!id) return;

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/resume/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) setForm(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SAVE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const url = id
        ? `http://localhost:5000/api/resume/${id}`
        : `http://localhost:5000/api/resume/create`;

      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert(id ? "Updated ✅" : "Created ✅");
      navigate("/my-resumes");

    } catch (err) {
      console.error(err);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
  const element = document.getElementById("resume-preview");

  const options = {
    margin: 0.5,
    filename: `${form.name || "Resume"}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 2,
    },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait",
    },
  };

  html2pdf().set(options).from(element).save();
};
  // PDF DOWNLOAD (simple frontend method)
  



  return (
    <div className="builderContainer">

      {/* LEFT FORM */}
      <div className="builderForm">

        <h1>🧑 Resume Builder</h1>
        <p>Create your professional resume</p>

        {loading && <p>Loading...</p>}

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
  name="email"
  placeholder="Email"
  value={form.email}
  onChange={handleChange}
/>
         <input
  name="phone"
  placeholder="Phone Number"
  value={form.phone}
  onChange={handleChange}
/>

<input
  name="address"
  placeholder="Address"
  value={form.address}
  onChange={handleChange}
/>

<input
  name="linkedin"
  placeholder="LinkedIn Profile URL"
  value={form.linkedin}
  onChange={handleChange}
/>

<input
  name="github"
  placeholder="GitHub Profile URL"
  value={form.github}
  onChange={handleChange}
/>

<input
  name="portfolio"
  placeholder="Portfolio Website"
  value={form.portfolio}
  onChange={handleChange}
/>

<textarea
  name="summary"
  placeholder="Professional Summary"
  value={form.summary}
  onChange={handleChange}
/>
        <textarea
          name="skills"
          placeholder="Skills"
          value={form.skills}
          onChange={handleChange}
        />

        <textarea
          name="education"
          placeholder="Education"
          value={form.education}
          onChange={handleChange}
        />

        <textarea
          name="experience"
          placeholder="Experience"
          value={form.experience}
          onChange={handleChange}
        />
          
          <textarea
  name="projects"
  placeholder="Projects"
  value={form.projects}
  onChange={handleChange}
/>

<textarea
  name="certifications"
  placeholder="Certifications"
  value={form.certifications}
  onChange={handleChange}
/>

<textarea
  name="languages"
  placeholder="Languages"
  value={form.languages}
  onChange={handleChange}
/>
        <div className="builderActions">

  <button onClick={handleSubmit} className="btnPrimary">
    {id ? "Update Resume" : "Save Resume"}
  </button>
<button onClick={downloadPDF} className="btnSecondary">
  ⬇ Download
</button>

</div>
      </div>

      {/* RIGHT LIVE PREVIEW */}
      <div className="previewCard" id="resume-preview">

        <h2>📄 Live Preview</h2>

        <div className="previewCard">

          <AIAnalysis />

  <h2>{form.name || "Your Name"}</h2>
  <p style={{ color: "#666", fontWeight: "bold" }}>
  MERN Stack Developer
</p>

  <p>
  📧 {form.email || "email@example.com"} | 📱 {form.phone || "+91 XXXXXXXXXX"} | 📍 {form.address || "Your Address"}
</p>

  <hr />

  <h4>Professional Summary</h4>
  <p>{form.summary || "Your professional summary will appear here."}</p>

  <h4>Skills</h4>
  <p>{form.skills || "Skills will appear here."}</p>

  <h4>Education</h4>
  <p>{form.education || "Education details."}</p>

  <h4>Experience</h4>
  <p>{form.experience || "Experience details."}</p>

  <h4>Projects</h4>
  <p>{form.projects || "Projects will appear here."}</p>

  <h4>Certifications</h4>
  <p>{form.certifications || "Certifications will appear here."}</p>

  <h4>Languages</h4>
  <p>{form.languages || "Languages will appear here."}</p>

  <h4>Links</h4>

  <p>
    <strong>LinkedIn:</strong><br />
    {form.linkedin || "LinkedIn Profile"}
  </p>

  <p>
    <strong>GitHub:</strong><br />
    {form.github || "GitHub Profile"}
  </p>

  <p>
    <strong>Portfolio:</strong><br />
    {form.portfolio || "Portfolio Website"}
  </p>

</div>

      </div>

    </div>
  );
}