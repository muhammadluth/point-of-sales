const express = require("express");
const Route = express.Router();

const product = require("./routes/product");
const category = require("./routes/category");
const users = require("./routes/users");
const history = require("./routes/history");
const order = require("./routes/order");

Route.use("/product", product);
Route.use("/category", category);
Route.use("/users", users);
Route.use("/history", history);
Route.use("/order", order);

module.exports = Route;
