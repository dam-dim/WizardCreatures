const mongoose = require("mongoose");

const creatureSchema = new mongoose.Schema({
  name: { type: String, require: true },
  species: { type: String, require: true },
  skinColor: { type: String, require: true },
  eyeColor: { type: String, require: true },
  image: { type: String, require: true },
  description: { type: String, require: true },
  votes: { type: String, require: true },
  owner: { type: String, require: true },
});

const Creature = mongoose.model("Creature", creatureSchema);

module.exports = Creature;
