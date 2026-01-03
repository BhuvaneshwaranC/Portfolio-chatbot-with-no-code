const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database file path
const DB_PATH = path.join(__dirname, 'db.json');

// Default database structure
const getDefaultData = () => ({
  "personal_info": {
    "name": "Bhuvaneshwaran C",
    "title": "Web Developer & AI Enthusiast",
    "education": "BCA Student",
    "specialization": ["Web Development", "AI"],
    "description": "I'm a BCA student specializing in web development and AI, with hands-on experience in building real-world projects using Python, JavaScript, and machine learning. I enjoy creating useful, efficient, and scalable digital solutions.",
    "location": {
      "city": "Chennai",
      "state": "TN",
      "country": "India"
    },
    "contact": {
      "email": "bhuvanesh1631@gmail.com",
      "phone": "+91 93846 21246"
    },
    "social_links": {
      "github": "https://github.com/BhuvaneshwaranC",
      "linkedin": "https://www.linkedin.com/in/bhuvaneshwaran-c-a70416315/"
    },
    "resume": {
      "pdf_url": "https://drive.google.com/file/d/1SRUAVToE3rI9jCQpwR78ZeGn0tPyvU-x/view?usp=sharing",
      "google_drive_id": "1SRUAVToE3rI9jCQpwR78ZeGn0tPyvU-x",
      "last_updated": "2026-01-03",
      "download_url": "https://drive.google.com/uc?export=download&id=1SRUAVToE3rI9jCQpwR78ZeGn0tPyvU-x"
    }
  },
  "certifications": [
    {
      "id": 1,
      "title": "Digital Skills: Artificial Intelligence",
      "issuer": "Accenture via Future Learn",
      "date": "October 2025",
      "credential_id": "97NXEE2"
    },
    {
      "id": 2,
      "title": "Digital Skills: Digital Marketing",
      "issuer": "Accenture via Future Learn",
      "date": "December 2024",
      "credential_id": "I5HG7FQ"
    },
    {
      "id": 3,
      "title": "Python for Beginners",
      "issuer": "Simplilearn",
      "date": "August 2025",
      "credential_id": "8808711"
    },
    {
      "id": 4,
      "title": "Getting Python Interview Ready",
      "issuer": "Simplilearn",
      "date": "August 2025",
      "credential_id": "8734191"
    }
  ],
  "projects": [
    {
      "id": 1,
      "title": "AI-Driven Drug Trafficking Detection on Telegram",
      "description": "AI-Driven Drug Trafficking Detection on Telegram uses machine learning to identify drug-related messages in real time, with automated alerts and dashboard monitoring via Telegram APIs.",
      "technologies": [
        "Python",
        "Naïve Bayes",
        "Telegram Bot API",
        "Dashboard"
      ],
      "image": "Drug Trafficking.png",
      "links": {
        "code": "#",
        "live_demo": "#"
      }
    },
    {
      "id": 2,
      "title": "CodSoft Web Development (Calculator, Landing Page, Portfolio)",
      "description": "Developed responsive web applications using HTML, CSS, and JavaScript with a focus on UI/UX design, responsiveness, and clean code.",
      "technologies": [
        "HTML5",
        "CSS",
        "JavaScript"
      ],
      "image": "https://static.vecteezy.com/system/resources/thumbnails/008/612/703/small_2x/html-code-on-computer-monitor-software-web-developer-programming-code-photo.jpg",
      "links": {
        "code": "#",
        "live_demo": "#"
      }
    }
  ],
  "experience": [
    {
      "id": 1,
      "position": "Web Development Intern",
      "company": "CodSoft",
      "duration": "May 2024 - June 2024",
      "location": "Remote",
      "description": "Built responsive web projects using HTML, CSS, and JavaScript with a focus on clean, user-friendly design.",
      "achievements": [
        "Developed a responsive portfolio website showcasing projects and skills.",
        "Built a dynamic JavaScript calculator with error handling.",
        "Designed an accessible, visually consistent landing page.",
        "Enhanced performance using modular CSS and reusable code."
      ],
      "technologies": [
        "HTML5",
        "CSS",
        "JavaScript"
      ]
    }
  ],
  "skills": {
    "programming_languages": [
      "Python",
      "JavaScript"
    ],
    "web_technologies": [
      "HTML5",
      "CSS"
    ],
    "ai_ml": [
      "Machine Learning",
      "Naïve Bayes"
    ],
    "apis_integrations": [
      "Telegram Bot API"
    ],
    "other": [
      "UI/UX Design",
      "Responsive Design",
      "Dashboard Development"
    ]
  },
  "metadata": {
    "last_updated": "2026-01-03",
    "portfolio_version": "1.0",
    "status": "active"
  }
});

// Initialize database if it doesn't exist
const initializeDatabase = () => {
  if (!fs.existsSync(DB_PATH)) {
    console.log('⚠️  db.json not found, creating with default data...');
    const defaultData = getDefaultData();
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
      console.log('✅ Database created successfully');
      return defaultData;
    } catch (error) {
      console.error('❌ Failed to create database:', error);
      return null;
    }
  }
  return null;
};

// Helper function to read database with fallback
const readDatabase = () => {
  try {
    // Check if file exists
    if (!fs.existsSync(DB_PATH)) {
      console.log('📁 Database file not found, initializing...');
      const defaultData = initializeDatabase();
      if (defaultData) return defaultData;
      // If initialization failed, return default data from memory
      return getDefaultData();
    }
    
    // Read the file
    const fileContent = fs.readFileSync(DB_PATH, 'utf8');
    
    // Check if file is empty
    if (!fileContent || fileContent.trim() === '') {
      console.log('📁 Database file is empty, using default data...');
      const defaultData = getDefaultData();
      writeDatabase(defaultData);
      return defaultData;
    }
    
    // Parse and return
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('❌ Error reading database:', error);
    
    // Try to use default data as fallback
    console.log('🔄 Using default data as fallback...');
    return getDefaultData();
  }
};

// Helper function to write database
const writeDatabase = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    console.log('✅ Database updated successfully');
    return true;
  } catch (error) {
    console.error('❌ Error writing database:', error);
    return false;
  }
};

// Initialize database on server start
console.log('🔍 Checking database...');
const initialData = readDatabase();
if (initialData) {
  console.log('✅ Database loaded successfully');
  console.log(`📊 Data summary: ${initialData.projects?.length || 0} projects, ${initialData.certifications?.length || 0} certifications`);
} else {
  console.log('⚠️  Using in-memory database');
}

// ==================== ROUTES ====================

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio API Server',
    version: '1.0',
    status: 'online',
    database: fs.existsSync(DB_PATH) ? 'connected' : 'using fallback',
    endpoints: {
      'GET /api/portfolio': 'Get complete portfolio data',
      'GET /api/personal-info': 'Get personal information',
      'GET /api/certifications': 'Get all certifications',
      'GET /api/certifications/:id': 'Get specific certification',
      'GET /api/projects': 'Get all projects',
      'GET /api/projects/:id': 'Get specific project',
      'GET /api/experience': 'Get all experience',
      'GET /api/experience/:id': 'Get specific experience',
      'GET /api/skills': 'Get all skills',
      'POST /api/certifications': 'Add new certification',
      'POST /api/projects': 'Add new project',
      'POST /api/experience': 'Add new experience',
      'PUT /api/certifications/:id': 'Update certification',
      'PUT /api/projects/:id': 'Update project',
      'PUT /api/experience/:id': 'Update experience',
      'DELETE /api/certifications/:id': 'Delete certification',
      'DELETE /api/projects/:id': 'Delete project',
      'DELETE /api/experience/:id': 'Delete experience',
      'GET /api/chatbot/summary': 'Get portfolio summary for chatbot',
      'POST /api/chatbot/query': 'Query specific portfolio data',
      'POST /api/chatbot/suggestions': 'Submit chatbot suggestion',
      'GET /api/chatbot/suggestions': 'Get all chatbot suggestions'
    }
  });
});

// Get complete portfolio data
app.get('/api/portfolio', (req, res) => {
  const data = readDatabase();
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// ==================== PERSONAL INFO ====================

app.get('/api/personal-info', (req, res) => {
  const data = readDatabase();
  if (data && data.personal_info) {
    res.json(data.personal_info);
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

app.put('/api/personal-info', (req, res) => {
  const data = readDatabase();
  if (data) {
    data.personal_info = { ...data.personal_info, ...req.body };
    data.metadata.last_updated = new Date().toISOString().split('T')[0];
    if (writeDatabase(data)) {
      res.json({ message: 'Personal info updated', data: data.personal_info });
    } else {
      res.status(500).json({ error: 'Failed to update database' });
    }
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// ==================== CERTIFICATIONS ====================

app.get('/api/certifications', (req, res) => {
  const data = readDatabase();
  if (data && data.certifications) {
    res.json(data.certifications);
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

app.get('/api/certifications/:id', (req, res) => {
  const data = readDatabase();
  if (data && data.certifications) {
    const cert = data.certifications.find(c => c.id === parseInt(req.params.id));
    if (cert) {
      res.json(cert);
    } else {
      res.status(404).json({ error: 'Certification not found' });
    }
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

app.post('/api/certifications', (req, res) => {
  const data = readDatabase();
  if (data && data.certifications) {
    const newId = Math.max(...data.certifications.map(c => c.id), 0) + 1;
    const newCert = { id: newId, ...req.body };
    data.certifications.push(newCert);
    data.metadata.last_updated = new Date().toISOString().split('T')[0];
    if (writeDatabase(data)) {
      res.status(201).json({ message: 'Certification added', data: newCert });
    } else {
      res.status(500).json({ error: 'Failed to update database' });
    }
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

app.put('/api/certifications/:id', (req, res) => {
  const data = readDatabase();
  if (data && data.certifications) {
    const index = data.certifications.findIndex(c => c.id === parseInt(req.params.id));
    if (index !== -1) {
      data.certifications[index] = { ...data.certifications[index], ...req.body };
      data.metadata.last_updated = new Date().toISOString().split('T')[0];
      if (writeDatabase(data)) {
        res.json({ message: 'Certification updated', data: data.certifications[index] });
      } else {
        res.status(500).json({ error: 'Failed to update database' });
      }
    } else {
      res.status(404).json({ error: 'Certification not found' });
    }
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

app.delete('/api/certifications/:id', (req, res) => {
  const data = readDatabase();
  if (data && data.certifications) {
    const index = data.certifications.findIndex(c => c.id === parseInt(req.params.id));
    if (index !== -1) {
      const deleted = data.certifications.splice(index, 1);
      data.metadata.last_updated = new Date().toISOString().split('T')[0];
      if (writeDatabase(data)) {
        res.json({ message: 'Certification deleted', data: deleted[0] });
      } else {
        res.status(500).json({ error: 'Failed to update database' });
      }
    } else {
      res.status(404).json({ error: 'Certification not found' });
    }
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// ==================== PROJECTS ====================

app.get('/api/projects', (req, res) => {
  const data = readDatabase();
  if (data && data.projects) {
    res.json(data.projects);
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

app.get('/api/projects/:id', (req, res) => {
  const data = readDatabase();
  if (data && data.projects) {
    const project = data.projects.find(p => p.id === parseInt(req.params.id));
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

app.post('/api/projects', (req, res) => {
  const data = readDatabase();
  if (data && data.projects) {
    const newId = Math.max(...data.projects.map(p => p.id), 0) + 1;
    const newProject = { id: newId, ...req.body };
    data.projects.push(newProject);
    data.metadata.last_updated = new Date().toISOString().split('T')[0];
    if (writeDatabase(data)) {
      res.status(201).json({ message: 'Project added', data: newProject });
    } else {
      res.status(500).json({ error: 'Failed to update database' });
    }
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

app.put('/api/projects/:id', (req, res) => {
  const data = readDatabase();
  if (data && data.projects) {
    const index = data.projects.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
      data.projects[index] = { ...data.projects[index], ...req.body };
      data.metadata.last_updated = new Date().toISOString().split('T')[0];
      if (writeDatabase(data)) {
        res.json({ message: 'Project updated', data: data.projects[index] });
      } else {
        res.status(500).json({ error: 'Failed to update database' });
      }
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

app.delete('/api/projects/:id', (req, res) => {
  const data = readDatabase();
  if (data && data.projects) {
    const index = data.projects.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
      const deleted = data.projects.splice(index, 1);
      data.metadata.last_updated = new Date().toISOString().split('T')[0];
      if (writeDatabase(data)) {
        res.json({ message: 'Project deleted', data: deleted[0] });
      } else {
        res.status(500).json({ error: 'Failed to update database' });
      }
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// ==================== EXPERIENCE ====================

app.get('/api/experience', (req, res) => {
  const data = readDatabase();
  if (data && data.experience) {
    res.json(data.experience);
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

app.get('/api/experience/:id', (req, res) => {
  const data = readDatabase();
  if (data && data.experience) {
    const exp = data.experience.find(e => e.id === parseInt(req.params.id));
    if (exp) {
      res.json(exp);
    } else {
      res.status(404).json({ error: 'Experience not found' });
    }
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

app.post('/api/experience', (req, res) => {
  const data = readDatabase();
  if (data && data.experience) {
    const newId = Math.max(...data.experience.map(e => e.id), 0) + 1;
    const newExp = { id: newId, ...req.body };
    data.experience.push(newExp);
    data.metadata.last_updated = new Date().toISOString().split('T')[0];
    if (writeDatabase(data)) {
      res.status(201).json({ message: 'Experience added', data: newExp });
    } else {
      res.status(500).json({ error: 'Failed to update database' });
    }
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

app.put('/api/experience/:id', (req, res) => {
  const data = readDatabase();
  if (data && data.experience) {
    const index = data.experience.findIndex(e => e.id === parseInt(req.params.id));
    if (index !== -1) {
      data.experience[index] = { ...data.experience[index], ...req.body };
      data.metadata.last_updated = new Date().toISOString().split('T')[0];
      if (writeDatabase(data)) {
        res.json({ message: 'Experience updated', data: data.experience[index] });
      } else {
        res.status(500).json({ error: 'Failed to update database' });
      }
    } else {
      res.status(404).json({ error: 'Experience not found' });
    }
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

app.delete('/api/experience/:id', (req, res) => {
  const data = readDatabase();
  if (data && data.experience) {
    const index = data.experience.findIndex(e => e.id === parseInt(req.params.id));
    if (index !== -1) {
      const deleted = data.experience.splice(index, 1);
      data.metadata.last_updated = new Date().toISOString().split('T')[0];
      if (writeDatabase(data)) {
        res.json({ message: 'Experience deleted', data: deleted[0] });
      } else {
        res.status(500).json({ error: 'Failed to update database' });
      }
    } else {
      res.status(404).json({ error: 'Experience not found' });
    }
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// ==================== SKILLS ====================

app.get('/api/skills', (req, res) => {
  const data = readDatabase();
  if (data && data.skills) {
    res.json(data.skills);
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

app.put('/api/skills', (req, res) => {
  const data = readDatabase();
  if (data && data.skills) {
    data.skills = { ...data.skills, ...req.body };
    data.metadata.last_updated = new Date().toISOString().split('T')[0];
    if (writeDatabase(data)) {
      res.json({ message: 'Skills updated', data: data.skills });
    } else {
      res.status(500).json({ error: 'Failed to update database' });
    }
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// ==================== CHATBOT / BOTPRESS INTEGRATION ====================

// Endpoint for chatbot to get portfolio summary
app.get('/api/chatbot/summary', (req, res) => {
  const data = readDatabase();
  if (data && data.personal_info && data.skills) {
    const summary = {
      name: data.personal_info.name,
      title: data.personal_info.title,
      location: `${data.personal_info.location.city}, ${data.personal_info.location.state}`,
      email: data.personal_info.contact.email,
      total_certifications: data.certifications?.length || 0,
      total_projects: data.projects?.length || 0,
      total_experience: data.experience?.length || 0,
      key_skills: [
        ...(data.skills.programming_languages || []),
        ...(data.skills.web_technologies || [])
      ]
    };
    res.json(summary);
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// Endpoint for chatbot to search/query data
app.post('/api/chatbot/query', (req, res) => {
  const data = readDatabase();
  const { query, type } = req.body;
  
  if (!data) {
    return res.status(500).json({ error: 'Failed to read database' });
  }

  let response = {};

  switch(type) {
    case 'contact':
      response = {
        type: 'contact',
        data: {
          email: data.personal_info?.contact?.email,
          phone: data.personal_info?.contact?.phone,
          linkedin: data.personal_info?.social_links?.linkedin,
          github: data.personal_info?.social_links?.github
        }
      };
      break;

    case 'skills':
      response = {
        type: 'skills',
        data: data.skills || {}
      };
      break;

    case 'projects':
      response = {
        type: 'projects',
        data: (data.projects || []).map(p => ({
          title: p.title,
          description: p.description,
          technologies: p.technologies
        }))
      };
      break;

    case 'certifications':
      response = {
        type: 'certifications',
        data: (data.certifications || []).map(c => ({
          title: c.title,
          issuer: c.issuer,
          date: c.date
        }))
      };
      break;

    case 'experience':
      response = {
        type: 'experience',
        data: (data.experience || []).map(e => ({
          position: e.position,
          company: e.company,
          duration: e.duration,
          description: e.description
        }))
      };
      break;

    default:
      response = {
        type: 'general',
        data: {
          name: data.personal_info?.name,
          title: data.personal_info?.title,
          description: data.personal_info?.description
        }
      };
  }

  res.json(response);
});

// Store chatbot suggestions/feedback
app.post('/api/chatbot/suggestions', (req, res) => {
  const data = readDatabase();
  if (data) {
    if (!data.chatbot_suggestions) {
      data.chatbot_suggestions = [];
    }
    
    const suggestion = {
      id: data.chatbot_suggestions.length + 1,
      timestamp: new Date().toISOString(),
      message: req.body.message,
      user_query: req.body.user_query || null,
      category: req.body.category || 'general'
    };
    
    data.chatbot_suggestions.push(suggestion);
    
    if (writeDatabase(data)) {
      res.status(201).json({ 
        message: 'Suggestion recorded', 
        data: suggestion 
      });
    } else {
      res.status(500).json({ error: 'Failed to save suggestion' });
    }
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// Get all chatbot suggestions
app.get('/api/chatbot/suggestions', (req, res) => {
  const data = readDatabase();
  if (data) {
    res.json(data.chatbot_suggestions || []);
  } else {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  const dbExists = fs.existsSync(DB_PATH);
  res.json({
    status: 'healthy',
    database: dbExists ? 'connected' : 'fallback mode',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio API Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/`);
  console.log(`📁 Database: ${DB_PATH}`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
});
