const jwt = require("jsonwebtoken");

const validateUser = function (req, res, next) {
  if (!req.session.user) return res.status(403).send();
  const user = jwt.verify(req.session.user, "secretekey");
  req.user = user;

  next();
};

module.exports = {
  validateUser,
};
