const router = require("express").Router();
const {
  forLoggedIn,
  forLoggedOut,
} = require("../middlewares/authentication.middleware");
const creatureService = require("../services/creature.service");

router.get("/", async (req, res) => {
  const allPosts = await creatureService.getAll().lean();
  console.log(allPosts);
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
    res.redirect("/");
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

router.get("/details/postId", (req, res) => {
  //
  res.render("posts/details");
});

module.exports = router;
