const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const farmvisitSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
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

const Farmvisit = mongoose.model("farmvisit", farmvisitSchema);

module.exports = Farmvisit;
