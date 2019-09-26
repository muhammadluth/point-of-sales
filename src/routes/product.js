const express = require('express')
const Route = express.Router()

//import controller
const productController = require('../controllers/product')


Route
    .get('/', productController.getProduct)
    .post('/',productController.addProduct)
    .put('/:id', productController.updateProduct)
    .delete('/:id',productController.deleteProduct)
    .patch('/:id', productController.reduceProduct)


module.exports = Route