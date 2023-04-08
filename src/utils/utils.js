const jwt = require("jsonwebtoken");
const User =  require("../model/user");

// const validateUser = function (req, res, next) {
//   if (!req.session.user)
//     return res.status(401).json({ message: "UnAuthorized" });

//   const user = jwt.verify(req.session.user, "secretekey");
//   req.user = user;

//   next();
// };

async function validateUser(req, res, next) {
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

  try{
    const is_user = await User.findById(user.id);
    if(is_user){
      req.user = is_user;
      next();
    }else throw new Error('UnAuthorized');

  }catch(error){
    return res.status(401).json({ message: error.message });

  }
  
 
}

module.exports = {
  validateUser,
};
