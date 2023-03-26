const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  cv: {
    type: String, // Storing image as binary data
    required: true,
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
careerSchema.virtual("imageURL").get(function () {
  if (this.image && this.image.contentType) {
    return `data:${this.image.contentType};base64,${this.image.toString(
      "base64"
    )}`;
  }
});

const Career = mongoose.model("career", careerSchema);

module.exports = Career;
