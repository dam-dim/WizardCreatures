const Creature = require("../models/creature.model");

exports.create = async (payload) => {
  const errors = [];

  try {
    await Creature.create(payload);
  } catch (error) {
    for (const key in error.errors) {
      errors.push(error.errors[key].message);
    }
  }

  return errors;
};

exports.getAll = () => {
  return Creature.find();
};

exports.findById = (postId) => {
  return Creature.findById(postId);
};

exports.update = async (postId, payload) => {
  //
  const errors = [];

  try {
    const post = await Creature.findById(postId);

    for (const key in payload) {
      post[key] = payload[key];
    }

    await post.save();
  } catch (error) {
    for (const key in error.errors) {
      errors.push(error.errors[key].message);
    }
  }

  return errors;
};

exports.delete = (postId) => {
  return Creature.findByIdAndDelete(postId);
};
