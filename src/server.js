const express = require("express");
const { PORT } = require("./lib/constants");
const appConfig = require("./config/app.config");

const main = () => {
  const app = express();

  appConfig(app);

  app.get("/", (req, res) => {
    res.send("OK!");
  });

  app.listen(PORT, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(`Server is listening on port ${PORT} ...`);
    }
  });
};

module.exports = main;
