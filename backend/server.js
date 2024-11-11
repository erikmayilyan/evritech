const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();
const dbConfig = require('./config');

app.use(express.json());

const frontendUrl = 'https://www.evritech.ca';

app.use(cors({
  origin: frontendUrl,
  credentials: true
}));

app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const otherRoute = require('./routes/otherRoute');
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/other', otherRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Listening on port ${port}`));
