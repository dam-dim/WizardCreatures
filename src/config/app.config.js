const dbConfig = require("./db.config");
const expressConfig = require("./express.config");

const appConfig = (app) => {
  dbConfig()
    .then(() => console.log(`Successfully connected to database ...`))
    .catch((err) => console.log(err.message));

  expressConfig(app);
};

module.exports = appConfig;
