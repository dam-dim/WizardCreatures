const dbConfig = require("./db.config");
const expressConfig = require("./express.config");

const appConfig = (app) => {
  dbConfig(app);
  expressConfig(app);
};

module.exports = appConfig;
