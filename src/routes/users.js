const express = require("express");
const Route = express.Router();
const middleware = require("../../auth/middleware");
const usersController = require("../controllers/users");

Route.get("/", middleware.checkToken, usersController.getAllUsers)
  .post("/login", usersController.login)
  .post("/register", usersController.register)
  .put("/:id", usersController.updateUsers);

module.exports = Route;
