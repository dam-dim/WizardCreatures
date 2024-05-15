const User = require("../models/user.model");

exports.register = async (credentials) => {
  const errors = [];

  try {
    const user = new User(credentials);
    user.validateSync();
    await user.save();
    return errors;
  } catch (error) {
    for (const key in error.errors) {
      errors.push(error.errors[key].message);
    }

    if (error.message === "Passwords must match!") {
      errors.push("Passwords must match!");
    }

    if (error.code === 11000) {
      errors.push("Email already exists!");
    }

    return errors;
  }
};

exports.login = (credentials) => {
  //
};
