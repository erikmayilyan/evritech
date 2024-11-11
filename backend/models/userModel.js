const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isEmployee: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  seenNotifications: {
    type: Array,
    default: []
  },
  deliveredNotifications: {
    type: Array,
    default: []
  },
}, {
  timestamps: true
});

const User = mongoose.model('users', userSchema);

module.exports = User;