require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Global Use
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());

// Routes
const authRoute = require("./routes/auth");
app.use("/tratrac-health/api/v1", authRoute);

// MiddleWares
const notFoundMiddleWare = require("./middlewares/notFound");
app.use(notFoundMiddleWare);

const connectDb = require("./databaseConnect/connect");

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (err) {
    console.log("db connection error", err);
  }
};

start();

module.exports = {
  app,
};
