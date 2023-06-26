const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/cloudbook";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to Mongo Successfully!"))
  .catch((error) => console.log(error));

module.exports = mongoose;
