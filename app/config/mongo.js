const mongoose = require('mongoose');

class Mongo {
  constructor() {
    this.options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }

    mongoose.connection.on('connected', () => console.log(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_SCHEMA}`));
    mongoose.connection.on('error', () => console.log('mongo error'));
    mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));
  }

  async connect(url) {
    await mongoose.connect(url, this.options);
  }

  async disconnect() {
    await mongoose.disconnect();
  }
}

module.exports = new Mongo();