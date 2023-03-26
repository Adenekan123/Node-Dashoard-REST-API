//models
const Farmvisit = require("../model/farmvisit");
const Careers = require("../model/career");
const Post = require("../model/post");

const getCounts = async (req, res) => {
  try {
    const careerCount = await Careers.countDocuments();
    const postCount = await Post.countDocuments();
    const farmVisitCount = await Farmvisit.countDocuments();

    res.json({ careerCount, postCount, farmVisitCount });
  } catch (e) {
    console.log(e);
    res.status(500).json();
  }
};

module.exports = {
  getCounts,
};
