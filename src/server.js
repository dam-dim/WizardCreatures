const express = require("express");
const { PORT } = require("./lib/constants");
const appConfig = require("./config/app.config");

const main = () => {
  const app = express();

  appConfig(app);
};

module.exports = main;
