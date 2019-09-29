// import all dependencies required
// import es5
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const passport = require('passport')
require('dotenv').config()
// import es6
// import express from 'express'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(fileUpload())
app.use(cors())

const routerNav = require('./src/index')

const port = process.env.SERVER_PORT || 3500

app.listen(port, function () {
  console.log('Server has running on port :' + port)
})

app.use('/api', routerNav)

app.get('*'), (req, res) => {
  res.send('Sorry, 404 Page not Found')
}
