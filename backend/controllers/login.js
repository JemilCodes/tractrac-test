const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const PatientModel = require("../models/patientModel");
const handleCookies = require("../utils/handleCookies");

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json("invalidLogin");
  }
  const userData = await PatientModel.findOne({ email }).exec();
  if (!userData) {
    return res.status(StatusCodes.BAD_REQUEST).json("userDoesNotExist");
  }
  const isPasswordCorrect = await bcrypt.compare(password, userData.password);
  if (isPasswordCorrect) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          name: userData.name,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    handleCookies(res, "jwt", accessToken);

    handleCookies(res, "email", userData.email);

    const logged = await PatientModel.findOneAndUpdate(
      { email },
      { isLoggedIn: true },
      { new: true, runValidators: true }
    );
    if (!logged) {
      return res.status(500).json("serverError");
    }

    if (logged.isLoggedIn === true) {
      const { name, email, isLoggedIn } = logged;
      const user = {
        email,
        name,
        isLoggedIn,
      };
      return res.status(StatusCodes.OK).json(user);
    } else {
      return res.status(500).json("serverError");
    }
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json("unauthorized");
  }
}

module.exports = login;
