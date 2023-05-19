const { StatusCodes } = require("http-status-codes");
const PatientModel = require("../models/patientModel");
const clearCookie = require("../utils/clearCookies");

const logout = async (req, res) => {
  const cookies = req.cookies;
  const { email } = req.cookies;

  const logged = await PatientModel.findOneAndUpdate(
    { email },
    { isLoggedIn: false },
    { new: true, runValidators: true }
  );
  if (logged.isLoggedIn !== false) {
    return res.status(500).json("serverError");
  }
  if (cookies?.jwt) {
    clearCookie(res, "jwt");
  }
  if (cookies?.email) {
    clearCookie(res, "email");
  }
  res.status(StatusCodes.OK).json("loggedOut");
};

module.exports = logout;
