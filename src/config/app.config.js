const dbConfig = require("./db.config");

const appConfig = (app) => {
  dbConfig(app);
};

module.exports = appConfig;
