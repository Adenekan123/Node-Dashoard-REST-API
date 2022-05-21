const express = require("express");
const { validateUser } = require("../utils/utils");
const { getprofile, toggleSuspend } = require("../controllers/userControler");

const Router = express.Router();

Router.get("/profile", validateUser, getprofile);
Router.get("/suspend", validateUser, toggleSuspend);

module.exports = Router;
