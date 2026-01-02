const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());  // ← FIX: Allows Botpress fetch

// JSON database safety
app.get('/chatbot', (req, res) => {
  try {
    const query = req.query.q ? req.query.q.toLowerCase().trim() : '';
    if (!query) {
      return res.status(400).json({ answer: 'Please provide a query (?q=your question)' });
    }

    const dataPath = path.join(__dirname, 'data', 'portfolio.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    let answer = 'No matching information found. Try asking about skills, projects, or experience.';

    if (query.includes('skill') || query.includes('skills')) {
      answer = data.skills ? data.skills.join(', ') : 'Skills data not available.';const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors()); // Enables Botpress cross-origin requests

app.get('/chatbot', (req, res) => {
  try {
    const query = req.query.q ? req.query.q.toLowerCase().trim() : '';
    if (!query) {
      return res.status(400).json({ answer: 'Please provide a query (?q=your question)' });
    }

    const dataPath = path.join(__dirname, 'db.json');
    
    // Safety checks
    if (!fs.existsSync(dataPath)) {
      return res.status(404).json({ answer: 'Database file db.json not found. Place it in project root.' });
    }

    const rawData = fs.readFileSync(dataPath, 'utf8');
    let data;
    try {
      data = JSON.parse(rawData);
    } catch (parseErr) {
      return res.status(500).json({ answer: 'Invalid JSON in db.json' });
    }

    let answer = 'No matching information found. Try asking about skills, projects, profile, or contact.';

    if (query.includes('skill') || query.includes('skills')) {
      answer = data.skills ? data.skills.join(', ') : 'Skills data not available.';
    } else if (query.includes('project') || query.includes('projects')) {
      answer = data.projects ? 
        data.projects.map(p => `${p.title}: ${p.description}`).join('\n') : 
        'Projects data not available.';
    } else if (query.includes('experience') || query.includes('work')) {
      answer = data.experience ? data.experience.join('\n') : 'No experience data available.';
    } else if (query.includes('about') || query.includes('profile')) {
      answer = data.profile ? 
        `${data.profile.name} - ${data.profile.domain}\n${data.profile.about}` : 
        data.about || 'AI Portfolio Chatbot for Bhuvaneshwaran C.';
    } else if (query.includes('contact')) {
      answer = data.contact ? 
        `Email: ${data.contact.email}\nPhone: ${data.contact.phone}` : 
        'Contact data not available.';
    }

    res.json({ answer });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ answer: `Server error: ${error.message}` });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Portfolio API server running on port ${PORT}`);
});

    } else if (query.includes('project') || query.includes('projects')) {
      answer = data.projects ? 
        data.projects.map(p => `${p.name}: ${p.description}`).join('\n') : 
        'Projects data not available.';
    } else if (query.includes('experience') || query.includes('work')) {
      answer = data.experience ? data.experience.join('\n') : 'Experience data not available.';
    } else if (query.includes('about')) {
      answer = data.about || 'AI Portfolio Chatbot - Built with Node.js, JSON database, and Botpress.';
    }

    res.json({ answer });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ answer: `Server error: ${error.message}` });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Portfolio API server running on port ${PORT}`);
});
