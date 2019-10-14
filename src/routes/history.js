const express = require("express");
const Route = express.Router();
const middleware = require("../../auth/middleware");
// import controller
const historyController = require("../controllers/history");

Route.get("/", historyController.getHistory).post(
  "/",
  historyController.addHistory
);

module.exports = Route;
