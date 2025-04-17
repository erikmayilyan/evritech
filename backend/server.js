process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();
const dbConfig = require('./config'); 

app.use(express.json());

//the new version
const allowedOrigins = [
  /^https:\/\/(www\.)?evritech\.ca$/, 
  /^http:\/\/localhost:3000$/
];

app.use(cors({
  origin: function (origin, callback) {
    console.log('Request Origin:', origin);
    if (!origin) {
      console.log("No origin header detected, allowing CORS");
      return callback(null, true); 
    }
    const allowed = allowedOrigins.some(pattern => pattern.test(origin));
    if (allowed) {
      console.log(`Allowed origin: ${origin}`);
      callback(null, true);
    } else {
      console.log(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
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

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
