const router = require("express").Router();
const homeController = require("../controllers/home.controller");

router.use(homeController);

router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
