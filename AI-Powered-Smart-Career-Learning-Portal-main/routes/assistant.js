import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    const { subject, question } = req.body;

    const prompt = `
You are a BTech AI tutor.

Subject: ${subject}

Student Question:
${question}

Give:
- Clear explanation
- Simple examples
- Step by step answer
- If needed, analogy
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: "Assistant failed" });
  }
});

export default router;