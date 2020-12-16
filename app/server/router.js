const userController = require('./controllers/userController');

class Router {
  constructor(app) {
    //teste ping-pong
    app.get('/ping', () => console.log('pong'));

    //get usuario por id
    app.get('/user/:id', userController.getUser);

    //cadastro de usuario
    app.post('/user', userController.createUser);

    // adiciona livro a collection booksLand
    app.post('/book', userController.addBook);

    //emprestar livro para o usuario
    app.put('/book/lend', userController.lendBook);

    //devolve o livro para o usuario proprietario
    app.put('/book/return', userController.returnBook);

  }
}

module.exports = Router;