const UserModel = require('../models/user');
const moment = require('moment');

class User {

  //validacao dos campos do usuario
  async validateUser(name, email, user) {
    try {
      let errors = [];

      if (!name || !email) {
        errors.push({ msg: 'Preencha todos os campos' });
      }

      if (user) {
        errors.push({ msg: 'Email ja cadastrado' })
      }

      if (errors.length > 0) {
        return {
          errors: errors,
          name: name,
          email: email,
        };
      }

      return errors;
    } catch (e) {
      throw e;
    }
  }

  async getUserByEmail(email) {
    try {
      let result = await UserModel.collection.findOne({ email: email });

      return result;
    } catch (e) {
      throw e;
    }
  }

  async insertNewUser(name, email) {
    try {
      const newUser = new UserModel({
        name: name,
        email: email,
        created_at: moment(),
        books: [],
        lend_books: [],
        borrowed_books: []
      });

      let result = await UserModel.collection.insertOne(newUser);

      return result;
    } catch (e) {
      throw e;
    }
  }

  async getUserById(id) {
    try {
      let result = await UserModel.findById({ _id: id });

      return result;
    } catch (e) {
      throw e;
    }
  }

  async processUpdate(user, userProperty, book) {
    try {
      let allBooks = [];

      //popula o arrray do que ja estiver salvo no banco(livros, emprestimo de livros, e livros que pegou emprestado, dependera da userProperty enviada).
      if (user[userProperty].length > 0) {
        for (let userBook of user[userProperty]) {
          if (userProperty === 'books') {
            allBooks.push({
              id: userBook.id,
              tittle: userBook.tittle,
              pages: userBook.pages,
              created_at: userBook.created_at
            })
          }

          if (userProperty === 'lend_books' || userProperty === 'borrowed_books') {
            allBooks.push({
              book_id: book.book_id,
              from_user: book.from_user,
              to_user: book.to_user,
              lent_at: book.lent_at,
              returned_at: book.returned_at
            })
          }
        }
      }

      if (userProperty === 'books') {
        allBooks.push({
          id: book.id,
          tittle: book.tittle,
          pages: book.pages,
          created_at: book.created_at
        })
      }

      if (userProperty === 'lend_books') {
        allBooks.push({
          book_id: book.book_id,
          from_user: book.from_user,
          to_user: book.to_user,
          lent_at: book.lent_at,
          returned_at: moment()
        });
      }

      if (userProperty === 'borrowed_books') {
        allBooks.push({
          book_id: book.book_id,
          from_user: book.from_user,
          to_user: book.to_user,
          lent_at: book.lent_at,
          returned_at: moment()
        });
      }
      console.log('allBooks', allBooks);
      await UserModel.updateOne({ _id: user._id }, { $set: { [userProperty]: allBooks } });
      return;

    } catch (e) {
      throw e;
    }
  }
}

module.exports = new User();