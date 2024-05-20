const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");
const { SECRET } = require("../lib/constants");

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

exports.login = async (credentials) => {
  const user = await User.findOne({ email: credentials.email }).lean();

  if (!user) {
    throw new Error("Invalid email or password!");
  }

  const validPassword = await bcrypt.compare(
    credentials.password,
    user.password
  );

  if (!validPassword) {
    throw new Error("Invalid email or password!");
  }

  const payload = { id: user._id, email: user.email };

  const token = await jwt.sign(payload, SECRET, { expiresIn: "5m" });

  return token;
};

exports.findById = (userId) => {
  return User.findById(userId);
};
