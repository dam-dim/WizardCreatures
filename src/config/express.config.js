const express = require("express");
const path = require("path");
const routes = require("../routes/router");
const handlebars = require("express-handlebars");

module.exports = (app) => {
  // Setup path for static files
  app.use(express.static(path.resolve(__dirname, "../../public")));

  // Setup the body parser
  app.use(express.urlencoded({ extended: false }));

  // Setup the routes
  app.use(routes);

  // Setup the handlebars view engine
  app.engine("hbs", handlebars.engine({ extname: "hbs" }));
  app.set("view engine", "hbs");
  app.set("views", "src/views");
};
