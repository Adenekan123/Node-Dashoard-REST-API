const express = require("express");
const { validateUser } = require("../utils/utils");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Please upload an image file"));
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

const Router = express.Router();

Router.post("/", validateUser, upload.single("image"), addPost);
Router.get("/", getPosts);
Router.get("/:id", getPost);
Router.delete("/:id", validateUser, deletePost);
Router.post("/:id", upload.single("image"), updatePost);

module.exports = Router;
