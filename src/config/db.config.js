const { URL } = require("../lib/constants");
const mongoose = require("mongoose");

async function dbConnect() {
  await mongoose.connect(URL);
}

module.exports = dbConnect;
