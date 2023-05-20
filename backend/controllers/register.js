const { StatusCodes } = require("http-status-codes");
const PatientModel = require("../models/patientModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const handleCookies = require("../utils/handleCookies");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json("unauthorized");
  }
  const userExist = await PatientModel.findOne({ email });
  if (userExist) {
    return res.status(StatusCodes.UNAUTHORIZED).json("userAlreadyExist");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashsedPassword = await bcrypt.hash(password, salt);
    const tempPatient = {
      name,
      email,
      password: hashsedPassword,
      isLoggedIn: false,
    };
    const userData = await PatientModel.create(tempPatient);

    if (!userData) {
      return res.status(500).json("userAlreadyExist");
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          name,
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

    if (logged.isLoggedIn === true) {
      const { email, name, isLoggedIn } = logged;
      const user = {
        email,
        name,
        isLoggedIn,
      };
      return res.status(StatusCodes.OK).json(user);
    } else {
      return res.status(500).json("serverError");
    }
  }
};
module.exports = register;
