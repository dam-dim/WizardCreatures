const { SECRET } = require("../lib/constants");
const jwt = require("../lib/jwt");
const creatureService = require("../services/creature.service");

// Writes the user in res.locals (if there is any)
// resets every 5 minutes -> go to user.post login to change
exports.auth = async (req, res, next) => {
  const token = req.cookies.token;

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
      res.redirect("/");
    }
  } else {
    next();
  }
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

exports.forOwner = async (req, res, next) => {
  const { postId } = req.params;
  const post = await creatureService.findById(postId);
  const userId = req.user.id;

  if (post.isOwner(userId)) {
    next();
  } else {
    res.redirect("/posts");
  }
};

exports.forNotOwner = async (req, res, next) => {
  const { postId } = req.params;
  const post = await creatureService.findById(postId);
  const userId = req.user.id;

  if (!post.isOwner(userId)) {
    next();
  } else {
    res.redirect("/posts");
  }
};
