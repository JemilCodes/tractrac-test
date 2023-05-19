const clearCookie = (res, key) => {
  const ENV = process.env.NODE_ENV;
  res.clearCookie(key, {
    httpOnly: true,
    ...(ENV === "production" && { secure: true }),
  });
};

module.exports = clearCookie;
