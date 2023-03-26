const express = require("express");

const { getCounts } = require("../controllers/dashboardController");

const Router = express.Router();

Router.get("/counts", getCounts);

module.exports = Router;
