const handleUser = require('../../lib/handleUser');
const handleBook = require('../../lib/handleBook');


class User {

  //funcao async para criacao do usuario.(find no mongo/insercao no mongo)
  async createUser(req, res) {
    try {
      const { name, email } = req.body;

      //find do usuario no mongo usando o email como parametro de busca
      const user = await handleUser.getUserByEmail(email);

      //validacao dos campos utilizados
      let errors = await handleUser.validateUser(name, email, user);

      //retorna os erros como response
      if (errors.hasOwnProperty('errors') && errors.errors.length > 0) {
        res.send(errors.errors);
      } else {
        //insercao do novo usuario na collection bookslend
        let result = await handleUser.insertNewUser(name, email);
        res.send(result.ops);
      }

    } catch (e) {
      //loga o erro no terminal
      console.error(e.message);
      throw e;
    }
  }

  //pega todo o doc do mongo do usuario(detalhes do usuario)
  async getUser(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.send('FALTA DO PARAMETRO: [ID]')
      }

      const user = await handleUser.getUserById(id);

      if (!user) {
        res.send('USUARIO NAO ENCONTRADO')
      }

      res.send(user);

    } catch (e) {
      //loga o erro na tela
      console.error(e.message);
      throw e;
    }
  }

  //adiciona um livro na collection books e tambem no array de books do usuario
  async addBook(req, res) {
    try {
      const { logged_user_id, tittle, pages } = req.body;

      let errors = await handleBook.validateBook(logged_user_id, tittle, pages);

      if (errors.hasOwnProperty('errors') && errors.errors.length > 0) {
        res.send(errors.errors);
      }

      let user = await handleUser.getUserById(logged_user_id);

      if (!user) {
        res.send('USUARIO NAO ENCONTRADO')
      }

      const book = await handleBook.insertBook(tittle, pages, logged_user_id);
      await handleUser.processUpdate(user, 'books', book, logged_user_id);


      res.send(book);

    } catch (e) {
      //loga o erro no terminal
      console.error(e.message);
      throw e;
    }
  }

  //adiciona o registro na collection: lendbooks
  //faz update no usuario que emprestou o livro
  //faz o update no usario que pegou emprestado
  async lendBook(req, res) {
    try {
      const { logged_user_id, book_id, to_user_id } = req.body;

      let errors = await handleBook.validateLendBook(logged_user_id, book_id, to_user_id);

      if (errors.hasOwnProperty('errors') && errors.errors.length > 0) {
        res.send(errors.errors);
      }

      let checkLendBook = await handleBook.checkLendBook(book_id);

      if (checkLendBook) {
        res.send('VOCE NAO PODE EMPRESTAR UM LIVRO QUE ESTA EMPRESTADO')
      } else {
        let userLogged = await handleUser.getUserById(logged_user_id);
        let userToBorrow = await handleUser.getUserById(to_user_id);

        if (!userLogged) {
          res.send('USUARIO LOGADO NAO ENCONTRADO')
        }

        if (!userToBorrow) {
          res.send('USUARIO PARA EMPRESTAR LIVRO NAO ENCONTRADO')
        }

        let lentBook = await handleBook.insertLendBook(logged_user_id, book_id, to_user_id);
        await handleUser.processUpdate(userToBorrow, 'borrowed_books', lentBook);
        await handleUser.processUpdate(userLogged, 'lend_books', lentBook);
        await handleBook.removeBorrowedBook(lentBook);
        res.send(lentBook);
      }
    } catch (e) {
      //loga o erro no terminal
      console.error(e.message);
      throw e;
    }
  }

  async returnBook(req, res) {
    try {
      const { logged_user_id, book_id } = req.body;

      let errors = handleBook.validateBorrowedBook(logged_user_id, book_id);

      if (errors.hasOwnProperty('errors') && errors.errors.length > 0) {
        res.send(errors.errors);
      }

      let checkBookIsBorrowed = await handleBook.checkBorrowedBook(book_id);
      if (checkBookIsBorrowed) {
        res.send('VOCE NAO PODE DEVOLVER UM LIVRO QUE JA DEVOLVEU');
      } else {
        let userLogged = await handleUser.getUserById(logged_user_id);

        if (!userLogged) {
          res.send('USUARIO LOGADO NAO ENCONTRADO')
        }

        let book = await handleBook.getLendBookById(book_id);
        let borrowedBook = await handleBook.insertBorrowedBook(logged_user_id, book_id, book);
        await handleUser.processUpdate(userLogged, 'borrowed_books', book);
        await handleUser.processUpdate(userLogged, 'lend_book', borrowedBook);
        await handleBook.removeLendBook(book);

        res.send(borrowedBook);
      }

    } catch (e) {
      //loga o erro no terminal
      console.error(e.message);
      throw e;
    }
  }

}

module.exports = new User;