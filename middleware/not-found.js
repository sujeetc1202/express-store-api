const notFoundMiddleware = (req, res) =>
  res.status(404).send("Route doen't exists!");

module.exports = notFoundMiddleware;
