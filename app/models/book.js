const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  tittle: {
    type: String,
    required: true
  },
  pages: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;