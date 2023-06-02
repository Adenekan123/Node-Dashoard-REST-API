const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: Object, // Storing image as binary data
  },
  pdf: {
    type: Object, // Storing pdf as binary data
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual property to get the image URL
postSchema.virtual("imageURL").get(function () {
  if (this.image && this.image.contentType) {
    return `data:${this.image.contentType};base64,${this.image.toString(
      "base64"
    )}`;
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
