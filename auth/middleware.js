const jwt = require('jsonwebtoken')
const config = require('./config')
require('dotenv').config()

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization

  if (token) {
    if (token.startsWith('Bearer')) {
      token = token.slice(7, token.lenght)
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.json({
          status: 400,
          message: 'Token not Found'
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.json({
      status: 400,
      message: 'Token is not available'
    })
  }
}

module.exports = {
  checkToken: checkToken
}
