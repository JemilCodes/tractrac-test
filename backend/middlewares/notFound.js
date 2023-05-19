const notFound = (req, res) => {
  res.status(404).json("This route does not exist");
};

module.exports = notFound;
