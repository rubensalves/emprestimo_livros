const BookModel = require('../models/book');
const LendBookModel = require('../models/lendBook');
const BorrowedBookModel = require('../models/borrowedBook');

class User {

  //validacao das variaveis necessarias para se criar um livro(todos os erros serao exibidos de uma unica vez)
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

  //insercao de um novo livro no banco
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

  //verifica se o book_id esta presente dentro da collection lend_books, se o documento existir sera retornado true(sera usado para emitir erro)
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

  //insercao de um novo livro emprestado na collection lend_books
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

  //validacao das variaveis necessarias para emprestar um livro
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

  //validacao das variaveis necessarias devolver um livro
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

  //verifica se o book_id esta presente dentro da collection lend_books, se o documento existir sera retornado true(sera usado para emitir erro)
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

  //insercao de um novo livro na collection borrowed_books(quem pegou emprestado e devolveu)
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

  //remocao do livro da collection lend_books, isso ocorra caso o livro tenha sido devolvido(para ser possivel emprestar o mesmo livro novamente)
  async removeLendBook(book) {
    try {
      await LendBookModel.collection.removeOne({ book_id: book.book_id });
    } catch (e) {
      throw e;
    }
  }

  //remocao do licro da collection borrowed_books, isso acontecera caso o livro tenha sido emprestado(podera ser possivel devolver o livro novamente)
  async removeBorrowedBook(book) {
    try {
      await BorrowedBookModel.collection.removeOne({ book_id: book.book_id });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new User();