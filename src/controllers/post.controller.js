const router = require("express").Router();

router.get("/", (req, res) => {
  //
  res.render("posts/all-posts");
});

router.get("/create", (req, res) => {
  //
  res.render("posts/create");
});

router.post("/create", (req, res) => {
  //
});

router.get("/edit", (req, res) => {
  //
});

router.post("/edit", (req, res) => {
  //
});

router.get("/details", (req, res) => {
  //
});

module.exports = router;
