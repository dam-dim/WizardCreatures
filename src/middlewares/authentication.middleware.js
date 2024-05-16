const { SECRET } = require("../lib/constants");
const jwt = require("../lib/jwt");

// Writes the user in res.locals (if there is any)
exports.auth = async (req, res, next) => {
  const token = req.cookies["token"];

  console.log(token);

  if (token) {
    try {
      const decodedToken = await jwt.verify(token, SECRET);

      req.user = decodedToken;
      res.locals.user = decodedToken;
      res.locals.isAuthenticated = true;

      next();
    } catch (error) {
      console.log(error);
      res.clearCookie("token");
      res.redirect("/users/login");
    }
  }

  next();
};

// Prevention of going to endpoints not accessible if logged in (login, register)
exports.forLoggedOut = (req, res, next) => {
  if (!req.user) {
    next();
  } else {
    res.redirect("/");
    next();
  }
};

// Prevention of going to endpoints not accessible if not logged in (create, profile, logout)
exports.forLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/users/login");
  }
};
