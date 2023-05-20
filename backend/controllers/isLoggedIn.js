const PatientModel = require("../models/patientModel");

const isLoggedIn = async (req, res) => {
  console.log("hi");
  const { email } = req.cookies;
  console.log("hiii", email);

  const userData = await PatientModel.findOne({ email });
  if (!userData) {
    return res.status(200).json("false");
  }
  if (userData.isLoggedIn) {
    return res.status(200).json("true");
  } else {
    return res.status(200).json("false");
  }
};

module.exports = isLoggedIn;
