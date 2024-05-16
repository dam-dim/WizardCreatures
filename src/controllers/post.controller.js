const router = require("express").Router();
const {
  forLoggedIn,
  forLoggedOut,
} = require("../middlewares/authentication.middleware");

router.get("/", (req, res) => {
  res.render("posts/all-posts");
});

router.get("/create", forLoggedIn, (req, res) => {
  res.render("posts/create");
});

router.post("/create", forLoggedIn, (req, res) => {
  //
});

router.get("/edit", forLoggedIn, (req, res) => {
  //
});

router.post("/edit", forLoggedIn, (req, res) => {
  //
});

router.get("/details", (req, res) => {
  //
});

module.exports = router;
