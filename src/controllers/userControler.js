//models
const User = require("../model/user");

//user profile
const getprofile = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userid });
    if (!user) return res.status(404).json();

    res.status(200).json(user.toJSON());
  } catch (e) {
    res.status(500).json(e);
  }
};

const toggleSuspend = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user) return res.status(403).json();
    await User.findOneAndUpdate(
      { _id: req.body.id },
      { suspended: !user.suspended }
    );
    res.status(200).json();
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  getprofile,
  toggleSuspend,
};
