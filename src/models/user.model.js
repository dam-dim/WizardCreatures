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
  },
});

// userSchema.path("email").validate(function (email) {
//   const emailFromDB = mongoose.model("User").findOne({ email });
//   return !!emailFromDB;
// }, "Email already exists");

userSchema.virtual("repeatPassword").set(function validate(value) {
  if (value !== this.password) {
    throw new Error("Passwords must match!");
  }
});

userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

// userSchema.post("save", function (error, doc, next) {
//   if (error.name === "MongoServerError" && error.code === 11000) {
//     next(new Error("Email already exists!"));
//   } else {
//     next(error);
//   }
// });

const User = model("User", userSchema);

module.exports = User;
