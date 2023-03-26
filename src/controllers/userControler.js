//models
const User = require("../model/user");

//user profile

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).json();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json();
  }
};

const getprofile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userid }).toJSON();
    if (!user) return res.status(404).json();

    res.status(200).json(user.toJSON());
  } catch (e) {
    res.status(500).json(e);
  }
};

const toggleSuspend = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user) return res.status(401).json();
    await User.findOneAndUpdate(
      { _id: req.body.id },
      { suspended: !user.suspended }
    );
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  getUsers,
  getprofile,
  toggleSuspend,
};
