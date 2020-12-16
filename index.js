const server = require('./app/server/server');
const mongo = require('./app/config/mongo');

(async () => {
  try {
    server.listen();
    await mongo.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_SCHEMA}`);

  } catch (e) {
    console.log('error', e);
    process.exit(1);
  }
})();
