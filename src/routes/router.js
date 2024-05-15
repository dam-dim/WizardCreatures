const router = require("express").Router();
const homeController = require("../controllers/home.controller");
const userController = require("../controllers/user.controller");
const postController = require("../controllers/post.controller");

router.use(homeController);
router.use("/users", userController);
router.use("/posts", postController);

router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
