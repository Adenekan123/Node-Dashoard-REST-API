const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    firstname: { type: "string", required: true, trim: true },
    lastname: { type: "string", required: true, trim: true },
    title: { type: "string", required: true, trim: true },
    phone: { type: "string", required: true, trim: true },
    email: { type: "string", required: true, trim: true, unique: true },
    password: { type: "string", required: true, unique: true, trim: true },
  },
  { timesstamps: true }
);

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
