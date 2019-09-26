const express = require('express')
const Route = express.Router()

const product = require('./routes/product')
const category = require('./routes/category')
const users = require('./routes/users')

Route.use('/v1.0/product',product)
Route.use('/v1.0/category',category)
Route.use('/v1.0/users',users)


module.exports = Route