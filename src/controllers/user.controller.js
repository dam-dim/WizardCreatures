const router = require("express").Router();
const userService = require("../services/user.service");
const {
  forLoggedIn,
  forLoggedOut,
} = require("../middlewares/authentication.middleware");

router.get("/login", (req, res) => {
  //
  res.render("users/login");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const credentials = { email, password };

    const token = await userService.login(credentials);

    res.cookie("token", token, { httpOnly: false });

    res.redirect("/");
  } catch (error) {
    const errors = [error.message];
    res.render("users/login", { errors });
  }
});

router.get("/register", (req, res) => {
  //
  res.render("users/register");
});

router.post("/register", async (req, res) => {
  //
  const { firstName, lastName, email, password, repeatPassword } = req.body;
  const credentials = { firstName, lastName, email, password, repeatPassword };

  const errors = await userService.register(credentials);

  if (!errors.length) {
    res.redirect("/users/login");
  } else {
    res.render("users/register", { credentials, errors });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

router.get("/profile", (req, res) => {
  //
  res.render("users/my-posts");
});

module.exports = router;
