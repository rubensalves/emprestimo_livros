const BookModel = require('../models/book');
const LendBookModel = require('../models/lendBook');
const BorrowedBookModel = require('../models/borrowedBook');

class User {

  async validateBook(logged_user_id, tittle, pages) {
    try {
      let errors = [];

      if (!logged_user_id) {
        errors.push({ msg: 'FALTA DO PARAMETRO: [logged_user_id]' })
      }

      if (!tittle) {
        errors.push({ msg: 'FALTA DO PARAMETRO: [tittle]' })
      }

      if (!pages) {
        errors.push({ msg: 'FALTA DO PARAMETRO: [pages]' })
      }

      if (errors.length > 0) {
        return {
          errors: errors,
          logged_user_id: logged_user_id,
          tittle: tittle,
          pages: pages
        };
      }

      return errors;
    } catch (e) {
      throw e;
    }
  }

  async insertBook(tittle, pages, id) {
    try {
      const newBook = new BookModel({
        tittle: tittle,
        pages: pages,
        created_at: Date.now(),
        owner: id,
      });

      let result = await BookModel.collection.insertOne(newBook);

      return result.ops[0];
    } catch (e) {
      throw e;
    }
  }

  async checkLendBook(book_id) {
    try {
      let result = await LendBookModel.collection.findOne({ book_id: book_id });

      if (result) {
        return true;
      }

      return false;
    } catch (e) {
      throw e;
    }
  }

  async insertLendBook(logged_user_id, book_id, to_user_id) {
    try {
      const newLendBook = new LendBookModel({
        book_id: book_id,
        from_user: logged_user_id,
        to_user: to_user_id,
        lent_at: Date.now(),
      })

      let result = await LendBookModel.collection.insertOne(newLendBook);

      console.log('insertLendBook::::::::::::::::::', result.ops[0]);
      return result.ops[0];
    } catch (e) {
      throw e;
    }
  }

  async validateLendBook(logged_user_id, book_id, to_user_id) {
    try {
      let errors = [];
      if (!logged_user_id) {
        errors.push({ msg: 'faltando parametro logged_user_id' });
      }

      if (!book_id) {
        errors.push({ msg: 'faltando parametro book_id' });
      }

      if (!to_user_id) {
        errors.push({ msg: 'faltando parametro to_user_id' });
      }

      if (logged_user_id === to_user_id) {
        errors.push({ msg: 'voce nao pode emprestar um livro para si mesmo' });
      }

      return {
        errors: errors
      }
    } catch (e) {
      throw e;
    }
  }

  async validateBorrowedBook(logged_user_id, book_id) {
    try {
      let errors = [];

      if (!logged_user_id) {
        errors.push({ msg: 'FALTANDO O PARAMETRO logged_user_id' })
      }

      if (!book_id) {
        errors.push({ msg: 'FALTANDO O PARAMETRO book_id' })
      }

    } catch (e) {
      throw e;
    }
  }

  async checkBorrowedBook(book_id) {
    try {
      let result = await BorrowedBookModel.collection.findOne({ book_id: book_id });

      if (result) {
        return true;
      }

      return false;
    } catch (e) {
      throw e;
    }
  }


  async getLendBookById(book_id) {
    try {
      let book = await LendBookModel.collection.findOne({ book_id: book_id });
      return book;

    } catch (e) {
      throw e;
    }
  }

  async insertBorrowedBook(logged_user_id, book_id, book) {
    try {
      console.log('insertBorrowedBook', book);
      const newBorrowedBook = new BorrowedBookModel({
        book_id: book_id,
        from_user: logged_user_id,
        //o book emprestado foi adicionado com a propriedade from_user, (proprietario do livro)
        //como esta sendo feita a devolucao entende-se que o from_user anterior agora e o que esta recebendo, to_user
        //estou passando para o to_user: book.from_user
        to_user: book.from_user,
        lent_at: book.lent_at,
        return_at: Date.now()
      })

      let result = await BorrowedBookModel.collection.insertOne(newBorrowedBook);

      return result.ops[0];
    } catch (e) {
      throw e;
    }
  }

  async removeLendBook(book) {
    try {
      await LendBookModel.collection.removeOne({ book_id: book.book_id });
    } catch (e) {
      throw e;
    }
  }

  async removeBorrowedBook(book) {
    try {
      await BorrowedBookModel.collection.removeOne({ book_id: book.book_id });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new User();