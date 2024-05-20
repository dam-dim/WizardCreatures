const mongoose = require("mongoose");

const creatureSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required!"] },
  species: { type: String, required: [true, "Species is required!"] },
  skinColor: { type: String, required: [true, "Skin Color is required!"] },
  eyeColor: { type: String, required: [true, "Eye Color is required!"] },
  image: { type: String, required: [true, "Creature Image URL is required!"] },
  description: { type: String, required: [true, "Description is required!"] },
  votes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Owner is required!"],
  },
});

const Creature = mongoose.model("Creature", creatureSchema);

module.exports = Creature;
