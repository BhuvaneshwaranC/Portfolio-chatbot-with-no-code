const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

// Read JSON database safely
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "db.json"), "utf-8")
);

app.get("/chatbot", (req, res) => {
  const question = (req.query.q || "").toLowerCase();
  let answer = "Sorry, I don't have that information.";

  if (question.includes("skill")) {
    answer = data.skills.join(", ");
  } else if (question.includes("project")) {
    answer = data.projects[0].description;
  } else if (question.includes("about")) {
    answer = data.profile.about;
  }

  res.json({ answer });
});

// IMPORTANT for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>  console.log("Server running on port" + PORT);
});




