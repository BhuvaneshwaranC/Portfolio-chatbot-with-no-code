const express = require("express");
const fs = require("fs");
const app = express();

const data = JSON.parse(fs.readFileSync("db.json"));

app.get("/chatbot", (req, res) => {
  const question = req.query.q.toLowerCase();

  if (question.includes("skill")) {
    res.json({ answer: data.skills });
  } else if (question.includes("project")) {
    res.json({ answer: data.projects });
  } else if (question.includes("about")) {
    res.json({ answer: data.profile.about });
  } else {
    res.json({ answer: "Sorry, I don't have that information." });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
