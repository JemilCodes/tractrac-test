const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const { register, login, logout, isLoggedIn } = require("../controllers");
router.route("/auth/register").post(register);
router.route("/auth/login").post(login);
router.route("/auth/logout").post(logout);
router.route("/auth/isLoggedIn").get(authMiddleware, isLoggedIn);

module.exports = router;
