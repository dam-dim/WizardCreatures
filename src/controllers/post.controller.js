const router = require("express").Router();
const {
  forLoggedIn,
  forLoggedOut,
} = require("../middlewares/authentication.middleware");
const creatureService = require("../services/creature.service");
const userService = require("../services/user.service");

router.get("/", async (req, res) => {
  const allPosts = await creatureService.getAll().lean();
  res.render("posts/all-posts", { allPosts });
});

router.get("/create", forLoggedIn, (req, res) => {
  res.render("posts/create");
});

router.post("/create", forLoggedIn, async (req, res) => {
  //
  const { name, species, skinColor, eyeColor, image, description } = req.body;
  const payload = {
    name,
    species,
    skinColor,
    eyeColor,
    image,
    description,
    owner: req.user.id,
  };

  const errors = await creatureService.create(payload);

  if (!errors.length) {
    res.redirect("/posts");
  } else {
    res.render("posts/create", { payload, errors });
  }
});

router.get("/edit/postId", forLoggedIn, (req, res) => {
  //
  res.render("posts/edit");
});

router.post("/edit/postId", forLoggedIn, (req, res) => {
  //
});

router.get("/details/:postId", async (req, res) => {
  const postId = req.params.postId;
  const post = await creatureService.findById(postId).lean();

  const owner = await userService.findById(post.owner._id);

  res.render("posts/details", { post, owner: owner.fullName });
});

module.exports = router;
