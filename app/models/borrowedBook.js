const mongoose = require('mongoose');

const BorrowedBookSchema = new mongoose.Schema({
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
  },
  returned_at: {
    type: Date,
    default: Date.now
  }
});

const BorrowedBook = mongoose.model('borrowedBook', BorrowedBookSchema);

module.exports = BorrowedBook;