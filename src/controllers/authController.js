const jwt = require("jsonwebtoken");

//model
const User = require("../model/user");

const key = "secretekey";

//register
const register = async function (req, res) {
  try {
    const user = new User(req.body);
    if (!user) throw new Error("No such user");
    const payload = {
      name: user.name,
      role: "admin",
    };
    const token = jwt.sign(payload, "secretekey");
    req.session.user = token;
    await user.save();
    res.status(200).send(request.session.sessionID);
  } catch (err) {
    res.status(500).json();
  }
};

//login
const login = async function (req, res) {
  try {
    console.log(req.body);
    const user = await User.findByCredentials(req.body);
    if (!user) throw new Error("Invalid credentials");

    const payload = {
      name: user.name,
      role: "admin",
    };
    const token = jwt.sign(payload, "secretekey");
    // req.session.user = token;

    res.status(200).json(token);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//logout
const logout = async function (req, res) {
  try {
    await req.session.destroy();
    res.status(200).json();
  } catch (err) {
    res.status(500).json("internal server error");
  }
};

module.exports = {
  register,
  login,
  logout,
};
