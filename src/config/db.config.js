const { CONN_STR } = require("../lib/constants");
const mongoose = require("mongoose");

async function dbConnect() {
  await mongoose.connect(CONN_STR);
}

module.exports = dbConnect;
