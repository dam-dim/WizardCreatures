const express = require("express");
const { PORT } = require("./constants");

function main() {
  const app = express();

  app.get("/", (req, res) => {
    res.send("OK!");
  });

  app.listen(PORT, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(`Server is listening on port ${PORT} ...`);
    }
  });
}

module.exports = main;
