const jwt = require("jsonwebtoken");

// const validateUser = function (req, res, next) {
//   if (!req.session.user)
//     return res.status(401).json({ message: "UnAuthorized" });

//   const user = jwt.verify(req.session.user, "secretekey");
//   req.user = user;

//   next();
// };

function validateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "UnAuthorized" });
  }

  const token = authHeader.substring(7);
  if (!token || token === "" || token === "null") {
    return res.status(401).json({ message: "UnAuthorized" });
  }

  // TODO: Verify the token and set the user ID in the request object
  const user = jwt.verify(token, "secretekey");

  req.user = user;

  next();
}

module.exports = {
  validateUser,
};
