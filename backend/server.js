const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();
const dbConfig = require('./config'); 

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

app.use(express.json());

// Update allowed origins to match your frontend domains
const allowedOrigins = ['http://localhost:3000', 'https://www.evritech.ca'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);  // Allow requests without origin (for non-browser requests, etc.)
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));  // Block requests from disallowed origins
    }
  },
  credentials: true,  // Enable sending cookies with cross-origin requests
}));

console.log(`Allowed CORS origins: ${allowedOrigins.join(', ')}`);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const otherRoute = require('./routes/otherRoute');
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/other', otherRoute);

if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '..', 'frontend', 'build');
  console.log("Serving static files from:", buildPath);

  app.use(express.static(buildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'), function (err) {
      if (err) {
        console.error("Error serving index.html:", err);
        res.status(500).send("Error loading the application.");
      }
    });
  });
}

app.use((req, res, next) => {
  res.status(404).send("Sorry, we can't find that!");
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));
