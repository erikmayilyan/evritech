const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();
const dbConfig = require('./config'); 

app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'https://www.evritech.ca'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
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
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`));
