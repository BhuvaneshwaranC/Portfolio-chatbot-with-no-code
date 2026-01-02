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
      answer = data.skills ? data.skills.join(', ') : 'Skills data not available.';
    } else if (query.includes('project') || query.includes('projects')) {
      answer = data.projects ? 
        data.projects.map(p => ${p.name}: ${p.description}).join('\n') : 
        'Projects data not available.';
    } else if (query.includes('experience') || query.includes('work')) {
      answer = data.experience ? data.experience.join('\n') : 'Experience data not available.';
    } else if (query.includes('about')) {
      answer = data.about || 'AI Portfolio Chatbot - Built with Node.js, JSON database, and Botpress.';
    }

    res.json({ answer });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ answer: Server error: ${error.message} });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Portfolio API server running on port ${PORT});
});
