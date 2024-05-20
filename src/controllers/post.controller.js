const router = require("express").Router();
const {
  forLoggedIn,
  forLoggedOut,
  isOwner,
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

router.get("/edit/:postId", [forLoggedIn, isOwner], async (req, res) => {
  const post = await creatureService.findById(req.params.postId).lean();
  res.render("posts/edit", { post });
});

router.post("/edit/:postId", [forLoggedIn, isOwner], async (req, res) => {
  const postId = req.params.postId;

  const post = await creatureService.findById(postId).lean();

  const { name, species, skinColor, eyeColor, image, description } = req.body;
  const payload = { name, species, skinColor, eyeColor, image, description };

  const errors = await creatureService.update(postId, payload);

  if (errors.length) {
    res.render("posts/edit", { post, errors });
  } else {
    res.redirect(`/posts/details/${postId}`);
  }
});

router.get("/details/:postId", async (req, res) => {
  const postId = req.params.postId;
  const post = await creatureService.findById(postId).lean();

  const owner = await userService.findById(post.owner._id);

  const isOwner = owner._id.toString() === req.user?.id;

  res.render("posts/details", { post, owner: owner.fullName, isOwner });
});

router.get("/posts/delete/:postId", [forLoggedIn, isOwner], (req, res) => {
  // delete functionality
});

module.exports = router;
