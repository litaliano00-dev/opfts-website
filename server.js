const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  }
}));
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes for future functionality
app.get('/api/projects', (req, res) => {
  const projects = [
    {
      id: 1,
      name: "VantaOS",
      description: "A Linux OS made from scratch using Linux kernel and glibc library. Security-focused and not bloated.",
      githubUrl: "https://github.com/litaliano00-dev/vantaos/",
      image: "vantaos.jpg",
      tags: ["Linux", "Security", "OS"]
    },
    {
      id: 2,
      name: "GhostShare",
      description: "Secure messaging app available on F-Droid, Android APK, Linux, macOS, and Windows.",
      githubUrl: "https://github.com/litaliano00-dev/ghostshare/",
      image: "ghostshare.png",
      tags: ["Messaging", "Encryption", "Cross-platform"]
    },
    {
      id: 3,
      name: "VailUI",
      description: "A lightweight, not bloated GUI for VantaOS designed for efficiency and user experience.",
      githubUrl: "https://github.com/litaliano00-dev/vailui/",
      image: "vailui.png",
      tags: ["GUI", "Linux", "UI/UX"]
    },
    {
      id: 4,
      name: "VBoot",
      description: "Secure fast bootloader for VantaOS, designed for speed and security during system startup.",
      githubUrl: "https://github.com/litaliano00-dev/vboot/",
      image: "vboot.png",
      tags: ["Bootloader", "Security", "System"]
    }
  ];
  
  res.json(projects);
});

app.get('/api/team', (req, res) => {
  const team = [
    {
      name: "litaliano00",
      role: "Founder & Lead Developer",
      github: "https://github.com/litaliano00-dev/",
      discord: "https://discord.com/users/litaliano00._"
    },
    {
      name: "skibiditymus27",
      role: "Core Developer",
      github: "https://github.com/skibiditymus27",
      discord: "https://discord.com/users/skibiditymus27"
    },
    {
      name: "whitzscott",
      role: "Core Developer",
      github: "https://github.com/whitzzscott",
      discord: "https://discord.com/users/whitzscott"
    }
  ];
  
  res.json(team);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'OPFTS Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path 
  });
});

app.listen(PORT, () => {
  console.log(`OPFTS Backend server running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
