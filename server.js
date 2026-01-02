const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/chatbot', (req, res) => {
  try {
    const query = req.query.q ? req.query.q.toLowerCase().trim() : '';
    if (!query) return res.status(400).json({ answer: 'Add ?q=skills etc.' });

    const dataPath = path.join(__dirname, 'db.json');
    if (!fs.existsSync(dataPath)) {
      return res.status(404).json({ answer: 'db.json missing in root' });
    }

    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    let answer = 'Ask about skills, projects, profile, contact';

    if (query.includes('skill') || query.includes('skills')) {
      answer = data.skills.join(', ');
    } else if (query.includes('project') || query.includes('projects')) {
      answer = data.projects.map(p => `${p.title}: ${p.description}`).join('\n');
    } else if (query.includes('profile') || query.includes('about')) {
      answer = `${data.profile.name}\n${data.profile.domain}\n${data.profile.about}`;
    } else if (query.includes('contact')) {
      answer = `Email: ${data.contact.email}\nPhone: ${data.contact.phone}`;
    }

    res.json({ answer });
  } catch (error) {
    res.status(500).json({ answer: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
