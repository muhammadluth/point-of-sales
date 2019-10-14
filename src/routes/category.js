const express = require('express')
const Route = express.Router()
const middleware = require('../../auth/middleware')
// import controller
const categoryController = require('../controllers/category')

Route
  .get('/', categoryController.getCategory)
  .post('/',categoryController.addCategory)
  .put('/:id', categoryController.updateCategory)
  .delete('/:id', middleware.checkToken, categoryController.deleteCategory)

module.exports = Route
