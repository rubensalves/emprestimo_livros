require('dotenv').config();

const express = require('express');
const Router = require('./router');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.middlewares();
    this.router = new Router(this.app);
  }

  middlewares() {
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`SERVER LISTENING: ${this.port}`);
    });
  }
}

module.exports = new Server();