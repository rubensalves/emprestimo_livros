const mongoose = require('mongoose');

const LendBookSchema = new mongoose.Schema({
  book_id: {
    type: String,
    required: true
  },
  from_user: {
    type: String,
    required: true
  },
  to_user: {
    type: String,
    required: true
  },
  lent_at: {
    type: Date,
    default: Date.now
  }
});

const LendBook = mongoose.model('lendBook', LendBookSchema);

module.exports = LendBook;