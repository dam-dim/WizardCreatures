const router = require("express").Router();
const {
  forLoggedIn,
  forLoggedOut,
} = require("../middlewares/authentication.middleware");
const creatureService = require("../services/creature.service");

router.get("/", (req, res) => {
  res.render("posts/all-posts");
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
