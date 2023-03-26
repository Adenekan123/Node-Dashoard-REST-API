const express = require("express");

const {
  bookfarmVisit,
  getfarmVisits,
  getfarmVisit,
  deletefarmVisit,
} = require("../controllers/farmvisitController");

const Router = express.Router();

Router.post("/", bookfarmVisit);
Router.get("/", getfarmVisits);
Router.get("/:id", getfarmVisit);
Router.delete("/:id", deletefarmVisit);

module.exports = Router;
