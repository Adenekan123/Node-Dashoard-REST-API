const jwt = require("jsonwebtoken");

//model
const User = require("../model/user");

const key = "secretekey";

//register
const register = async function (req, res) {
  try {
    const user = new User(req.body);
    if (!user) throw new Error("No such user");
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json(err);
  }
};

//login
const login = async function (req, res) {
  try {
    const user = await User.findByCredentials(req.body);
    if (!user) throw new Error("Invalid credentials");
    const token = jwt.sign({ userid: user._id }, key);
    req.session.user = token;
    await req.session.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json(err);
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
