const express = require('express')
const Route = express.Router()

//import controller
const productController = require('../controllers/product')


Route
    .get('/', productController.getProduct)
    .get('/:id', productController.getById)
    .post('/',productController.addProduct)
    .put('/:id', productController.updateProduct)
    // .patch('/:id', productController.updateImage)
    .delete('/:id',productController.deleteProduct)
    .patch('/:id', productController.reduceProduct)


module.exports = Route