const router = require("express").Router();

router.get("/login", (req, res) => {
  //
  res.render("users/login");
});

router.post("/login", (req, res) => {
  //
});

router.get("/register", (req, res) => {
  //
  res.render("users/register");
});

router.post("/register", (req, res) => {
  //
});

router.get("/profile", (req, res) => {
  //
  res.render("users/my-posts");
});

module.exports = router;
