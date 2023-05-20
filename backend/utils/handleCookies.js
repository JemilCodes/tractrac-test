const handleCookies = (res, key, value) => {
  res.cookie(key, value, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

module.exports = handleCookies;
