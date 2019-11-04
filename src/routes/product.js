const express = require("express");
const Route = express.Router();
const middleware = require("../../auth/middleware");

// import controller
const productController = require("../controllers/product");

Route.get("/", productController.getProduct)
  .get("/desc", productController.getDesc)
  .get("/:id", productController.getById)
  .post("/", productController.addProduct)
  .put("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct)
  .patch("/:id", productController.reduceProduct);

module.exports = Route;
