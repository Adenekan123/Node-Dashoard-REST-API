const express = require("express");
const path = require("path");
const { validateUser } = require("../utils/utils");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "..", "cvs"));
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5, // 5 MB
//   },
// });

const upload = multer({ storage });

const {
  addCv,
  getCvs,
  getCv,
  deleteCv,
} = require("../controllers/careerController");

const Router = express.Router();

Router.post("/", upload.single("cv"), addCv);
Router.get("/", getCvs);
Router.get("/:id", getCv);
Router.delete("/:id", validateUser, deleteCv);

module.exports = Router;
