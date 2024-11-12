const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: true,
    trim: true
  },
  urlTitle: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Website = mongoose.model('Website', websiteSchema);

module.exports = Website;