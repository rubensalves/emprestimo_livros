const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  created_at: {
    type: Date,
    default: Date.now
  },
  books: {
    type: Array
  },
  lend_books: {
    type: Array
  },
  borrowed_books: {
    type: Array
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;