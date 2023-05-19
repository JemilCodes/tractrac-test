const handleCookies = (res, key, value) => {
  const ENV = process.env.NODE_ENV;

  res.cookie(key, value, {
    httpOnly: true,
    ...(ENV === "production" && { secure: true }),
    ...(ENV === "production" && { sameSite: "None" }),
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

module.exports = handleCookies;
