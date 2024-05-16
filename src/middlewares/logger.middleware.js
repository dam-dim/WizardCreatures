const path = require("path");
const fs = require("fs/promises");

exports.reqLogger = async (req, res, next) => {
  const newData = `Method: '${req.method}', Path: '${
    req.path
  }', '${new Date()}'`;

  let data = await fs.readFile(
    path.resolve(__dirname, "../logging/data.json"),
    "utf-8"
  );

  data += `${newData}\n`;

  await fs.writeFile(
    path.resolve(__dirname, "../logging/data.json"),
    data,
    "utf-8"
  );

  next();
};
