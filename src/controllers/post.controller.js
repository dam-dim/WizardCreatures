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

router.get("/edit/cubeId", forLoggedIn, (req, res) => {
  //
  res.render("posts/edit");
});

router.post("/edit/cubeId", forLoggedIn, (req, res) => {
  //
});

router.get("/details/cubeId", (req, res) => {
  //
  res.render("posts/details");
});

module.exports = router;
