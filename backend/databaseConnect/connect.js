const mongoose = require("mongoose");

const connectDb = (uri) => {
  mongoose.connect(uri);
};

module.exports = connectDb;
