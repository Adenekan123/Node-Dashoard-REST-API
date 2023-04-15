const jwt = require("jsonwebtoken");

//model
const User = require("../model/user");

const key = "secretekey";

//register
const register = async function (req, res) {
  try {
    const userExist = await User.mailExist(req.body);
    if (!userExist) {
      const user = new User(req.body);
      if (!user) throw new Error("No such user");
      const payload = {
        name: user._id,
        role: "admin",
      };
      const token = jwt.sign(payload, "secretekey");
      req.user = token;
      await user.save();
      res.status(200).json(token);
    }
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

//login
const login = async function (req, res) {
  try {
    const user = await User.findByCredentials(req.body);
    if (!user) throw new Error("Invalid credentials");

    const payload = {
      id: user._id,
      role: "admin",
    };
    const token = jwt.sign(payload, "secretekey");
    req.user = user;

    res.status(200).json(token);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

//logout
const logout = async function (req, res) {
  try {
    req.user = null;
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
