const express = require("express");
const { validateUser } = require("../utils/utils");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    if (!file || !file.mimetype) {
      cb("Please upload an image file",true);
    } else {
      cb(null, true);
    }
  },
});

const {
  addPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
} = require("../controllers/postController");
const {uploadToImageKit, deleteFromImageKit} = require("../utils/imagekit");

const Router = express.Router();

Router.post(
  "/",
  validateUser,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  uploadToImageKit,
  addPost
);
Router.get("/", getPosts);
Router.get("/:id", getPost);
Router.delete("/:id", validateUser, deletePost);
Router.post(
  "/:id",
  validateUser,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  uploadToImageKit,
  updatePost
);

module.exports = Router;
