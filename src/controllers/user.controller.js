const router = require("express").Router();
const userService = require("../services/user.service");

router.get("/login", (req, res) => {
  //
  res.render("users/login");
});

router.post("/login", (req, res) => {
  //
  const { email, password } = req.body;
  const credentials = { email, password };

  res.redirect("/");
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

router.get("/profile", (req, res) => {
  //
  res.render("users/my-posts");
});

module.exports = router;
