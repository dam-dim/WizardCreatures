const router = require("express").Router();

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

router.post("/register", (req, res) => {
  //
  const { firstName, lastName, email, password, repeatPassword } = req.body;
  const credentials = { firstName, lastName, email, password, repeatPassword };

  res.redirect("/users/login");
});

router.get("/profile", (req, res) => {
  //
  res.render("users/my-posts");
});

module.exports = router;
