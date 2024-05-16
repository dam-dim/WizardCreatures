const express = require("express");
const path = require("path");
const routes = require("../routes/router");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const { auth } = require("../middlewares/authentication.middleware");
const { reqLogger } = require("../middlewares/logger.middleware");

module.exports = (app) => {
  // Setup path for static files
  app.use(express.static(path.resolve(__dirname, "../../public")));

  // Setup the body parser
  app.use(express.urlencoded({ extended: false }));

  // Setup the cookie parser
  app.use(cookieParser());

  // Setup auth middleware
  app.use(auth);

  // Setup logger (fast)
  app.use((req, res, next) => {
    const newData = `Method: '${req.method}', Path: '${
      req.path
    }', '${new Date()}'`;
    console.log(newData);
    next();
  });

  // Setup the routes
  app.use(routes);

  // Setup the stream logger (slow)
  // app.use(reqLogger);

  // Setup the handlebars view engine
  app.engine("hbs", handlebars.engine({ extname: "hbs" }));
  app.set("view engine", "hbs");
  app.set("views", "src/views");
};
