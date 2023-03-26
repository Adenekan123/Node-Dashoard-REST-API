const express = require("express");
const { validateUser } = require("../utils/utils");
const {
  getUsers,
  getprofile,
  toggleSuspend,
} = require("../controllers/userControler");

const Router = express.Router();

Router.get("/users", validateUser, getUsers);
Router.get("/profile", validateUser, getprofile);
Router.patch("/users/suspend", validateUser, toggleSuspend);

module.exports = Router;
