const express = require ('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();
const dbConfig = require('./config');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const otherRoute = require('./routes/otherRoute');
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/other', otherRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Listening on port ${port}`));
