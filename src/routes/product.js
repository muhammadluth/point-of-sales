const express = require('express')
const Route = express.Router()
const middleware = require('../../auth/middleware')

// import controller
const productController = require('../controllers/product')

Route
  .get('/', productController.getProduct)
  .get('/:id', productController.getById)
  .post('/', middleware.checkToken,productController.addProduct)
  .put('/:id', middleware.checkToken, productController.updateProduct)
// .patch('/:id', productController.updateImage)
  .delete('/:id', middleware.checkToken, productController.deleteProduct)
  .patch('/:id', middleware.checkToken, productController.reduceProduct)

module.exports = Route
