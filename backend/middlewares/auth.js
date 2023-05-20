const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const { jwt: token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    next();
  });
};

module.exports = authMiddleware;
