const mongoose = require("mongoose");

const creatureSchema = new mongoose.Schema({
  name: { type: String, require: true },
  species: { type: String, require: true },
  skinColor: { type: String, require: true },
  eyeColor: { type: String, require: true },
  image: { type: String, require: true },
  description: { type: String, require: true },
  votes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const Creature = mongoose.model("Creature", creatureSchema);

module.exports = Creature;
