const router = require("express").Router();
const {
  forLoggedIn,
  forOwner,
  forNotOwner,
} = require("../middlewares/authentication.middleware");
const creatureService = require("../services/creature.service");
const userService = require("../services/user.service");
const { getVotesFormatted } = require("../utils/array.utils");

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

router.get("/edit/:postId", [forLoggedIn, forOwner], async (req, res) => {
  const post = await creatureService.findById(req.params.postId).lean();
  res.render("posts/edit", { post });
});

router.post("/edit/:postId", [forLoggedIn, forOwner], async (req, res) => {
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
  const userId = req.user.id;
  const postLean = await creatureService
    .findById(postId)
    .populate("votes")
    .lean();
  const post = await creatureService.findById(postId);

  const owner = await userService.findById(postLean.owner._id);

  const isOwner = owner._id.toString() === req.user?.id;

  res.render("posts/details", {
    post: postLean,
    owner: owner.fullName,
    isOwner,
    votes: getVotesFormatted(postLean.votes),
    voted: post.hasVoted(userId),
  });
});

router.get("/delete/:postId", [forLoggedIn, forOwner], async (req, res) => {
  try {
    await creatureService.delete(req.params.postId);
    res.redirect("/posts");
  } catch (error) {
    console.log(error);
    res.redirect("/404");
  }
});

router.get("/vote/:postId", [forLoggedIn, forNotOwner], async (req, res) => {
  const { postId } = req.params;
  const post = await creatureService.findById(postId);
  const leanPost = await creatureService.findById(postId).lean();
  const userId = req.user.id;

  try {
    post.vote(userId);
    res.redirect(`/posts/details/${postId}`);
  } catch (error) {
    console.log(error.message);
    res.redirect(`/posts/details/${postId}`);
  }
});

module.exports = router;
