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
  },
  returned_at: {
    type: Date,
  }
});

const BorrowedBook = mongoose.model('borrowedBook', BorrowedBookSchema);

module.exports = BorrowedBook;