const { Schema, model, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please enter a First Name!"],
    match: [/^[A-Za-z\s]+$/, "First Name must be with english letters only!"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter a Last Name!"],
    match: [/^[A-Za-z\s]+$/, "Last Name must be with english letters only!"],
  },
  email: {
    type: String,
    required: [true, "Please enter an Email!"],
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/, "Invalid email!"],
  },
  password: {
    type: String,
    required: [true, "Please enter a Password!"],
    match: [],
  },
});

userSchema.virtual("repeatPassword").set(function validate(value) {
  if (value !== this.password) {
    throw new Error("Passwords must match!");
  }
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = model("User", userSchema);

module.exports = User;
