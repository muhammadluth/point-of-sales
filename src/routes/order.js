const express = require("express");
const Route = express.Router();
const middleware = require("../../auth/middleware");
// import controller
const orderController = require("../controllers/order");

Route.get("/revenue", orderController.getRevenue) // grafik
  .get("/allorder", orderController.getAllOrder) // card
  .get("/recent", orderController.getRecentOrder); // table
module.exports = Route;
