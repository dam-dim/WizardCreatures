const Creature = require("../models/creature.model");

exports.create = async (payload) => {
  const errors = [];
  console.log(payload);

  try {
    await Creature.create(payload);
  } catch (error) {
    for (const key in error.errors) {
      errors.push(error.errors[key].message);
    }
  }

  return errors;
};
