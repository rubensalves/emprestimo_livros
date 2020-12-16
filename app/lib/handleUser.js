const UserModel = require('../models/user');

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
        created_at: Date.now(),
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

  // Faz o update no usuario com os livros
  async processUpdateBook(user, userId, book) {
    try {

      let allBooks = [];

      //verifica se o usuario ja possui livros, caso possua, o array e populado e depois sera feito um unico update(assim evitara sobrescrever)
      if (user.books.length > 0) {
        for (let userBook of user.books) {
          allBooks.push({
            id: userBook.id,
            tittle: userBook.tittle,
            pages: userBook.pages,
            created_at: userBook.created_at
          })
        }
      }

      //adiciona livros novos ao array
      allBooks.push({
        id: book._id,
        tittle: book.tittle,
        pages: book.pages,
        created_at: book.created_at
      })


      let result = await UserModel.findOneAndUpdate({ _id: userId }, { $set: { "books": allBooks } });

      return result;
    } catch (e) {
      throw e;
    }
  }

  // Faz o update no usuario com o livro emprestado
  async processUpdateLendBook(user, userId, lendBook) {
    try {
      let allLendBooks = [];

      //verifica se o usuario ja possui livros emprestados, caso possua, o array e populado e depois sera feito um unico update(assim evitara sobrescrever)
      if (user.lend_books.length > 0) {
        for (let userLentBook of user.lend_books) {
          allLendBooks.push({
            book_id: userLentBook.id,
            from_user: userLentBook.tittle,
            to_user: userLentBook.pages,
            lent_at: userLentBook.created_at,
            returned_at: ''
          })
        }
      }

      //adiciona livros emprestado ao array
      allLendBooks.push({
        book_id: lendBook.book_id,
        from_user: lendBook.from_user,
        to_user: lendBook.to_user,
        lent_at: lendBook.lent_at,
      })

      let result = await UserModel.findOneAndUpdate({ _id: userId }, { $set: { "lend_books": allLendBooks } });
      return result;

    } catch (e) {
      throw e;
    }
  }

  // Faz o update no usuario que esta pegando o livro emprestado
  async processUpdateBorrowedBook(user, userId, borrowedBook) {
    try {
      let allBorrowedBooks = [];

      //verifica se o usuario ja possui livros emprestados, caso possua, o array e populado e depois sera feito um unico update(assim evitara sobrescrever)
      if (user.lend_books.length > 0) {
        for (let userLentBook of user.lend_books) {
          allBorrowedBooks.push({
            book_id: userLentBook.id,
            from_user: userLentBook.tittle,
            to_user: userLentBook.pages,
            lent_at: userLentBook.created_at,
            returned_at: ''
          })
        }
      }

      //adiciona livros emprestado ao array
      allBorrowedBooks.push({
        book_id: borrowedBook.book_id,
        from_user: borrowedBook.from_user,
        to_user: borrowedBook.to_user,
        lent_at: borrowedBook.lent_at,
      })

      let result = await UserModel.findOneAndUpdate({ _id: userId }, { $set: { "borrowed_books": allBorrowedBooks } });
      return result;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new User();