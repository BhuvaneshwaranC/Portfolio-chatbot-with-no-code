const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());

// Read JSON database
const data = JSON.parse(fs.readFileSync("db.json"));

app.get("/chatbot", (req, res) => {
  const question = (req.query.q || "").toLowerCase();
  let answer = "Sorry, I don't have that information.";

  if (question.includes("skill")) {
    answer = data.skills.join(", ");
  } else if (question.includes("project")) {
    answer = data.projects.join(", ");
  } else if (question.includes("about")) {
    answer = data.profile.about;
  }

  // IMPORTANT: always return simple text
  res.json({ answer });
});

// IMPORTANT for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


