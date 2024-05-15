const dbConfig = require("./db.config");
const expressConfig = require("./express.config");
const { PORT } = require("../lib/constants");

const appConfig = (app) => {
  // DB Connection
  dbConfig()
    .then(() => console.log(`Successfully connected to database ...`))
    .catch((err) => console.log(err.message));

  // Other configurations
  expressConfig(app);

  // PORT Configuration
  app.listen(PORT, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(`Server is listening on port ${PORT} ...`);
    }
  });
};

module.exports = appConfig;
