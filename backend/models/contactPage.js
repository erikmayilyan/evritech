const mongoose = require('mongoose');

const contactPage = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  business: {
    type: String,
    required: true
  },
  theMessage: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

const ContactPage = mongoose.model("contact", contactPage);

module.exports = ContactPage;