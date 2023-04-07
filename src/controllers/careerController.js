//models
const Career = require("../model/career");

const addCv = async (req, res) => {
  try {
    const newCv = new Career({
      cv: req.cvUrl,
    });
    const savedCv = await newCv.save();
    res.status(201).json(savedCv);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const getCvs = async (req, res) => {
  try {
    const cvs = await Career.find();
    if (!cvs) return res.status(404).json();

    res.status(200).json(cvs);
  } catch (e) {
    console.log(e);
    res.status(500).json();
  }
};

const getCv = async (req, res, next) => {
  const cvid = req.params.id;
  try {
    const cv = await Career.findById(cvid);
    if (!cv) {
      return res.status(404).json({ message: "Post not found" });
    }

    const item = cv.toJSON();
    if (cv.cv) {
      item.cv = {
        data: item.cv.data.toString("base64"),
        contentType: item.cv.contentType,
      };
    }
    res.json([item]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCv = async (req, res) => {
  try {
    const { id: cvid } = req.params;

    // Check if the post exists
    const cv = await Career.findById(cvid);
    if (!cv) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete the post and return a success message
    const removedcv = await cv.remove();
    res.json(removedcv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addCv,
  getCvs,
  getCv,
  deleteCv,
};
