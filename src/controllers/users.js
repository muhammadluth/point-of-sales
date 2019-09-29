const usersModel = require('../models/users')
const uuid = require('uuid/v1')
const conn = require('.././configs/db')
const jwt = require('jsonwebtoken')
const config = require('../../auth/config')
const bcrypt = require('bcrypt')


module.exports = {
  login: (req, res) => {
    var { email, password } = req.body

    if (email && password) {
      conn.query('SELECT * FROM users WHERE email = ?', [email], (err, [result]) => {
        if (err) {
          return res.status(500).send({ err })
        }
        if (result < 1) {
          return res.json({
            success: 400,
            message: 'Account not Found!'
          })
        }
        bcrypt.compare(password, result.password, (err, valid) => {
          if (err) return res.status(500).send({ err })
          if (valid) {
            const token = jwt.sign({ email: email }, config.secret, { expiresIn: '24h' })
            return res.json({
              success: 200,
              message: 'Login success',
              data: token
            })
          }
          res.json({
            success: 403,
            message: 'Your password invalid'
          })
        })
      })
    } else {
      res.json({
        success: 400,
        message: 'Please insert user and paswword'
       })
      }
  },
  getAllUsers: (req, res) => {
    usersModel.getAllUsers()
      .then(result => {
        res.json({
          status: 200,
          message: 'Success Viewing Users!',
          data: (result)
        })
      })
      .catch(err => {
        console.log(err)
        res.json({
          status: 500,
          message: 'Error Viewing Users!'
        })
      })
  },
  register: (req, res) => {

    var { username, email, password } = req.body


    usersModel.register(username, email, password).then(result => {
      res.json({
        status: 200,
        message: 'Registration Success'
      })
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        status: 500,
        message: 'Registration Failed, Because Duplicate Email '
      })
    })
  },
  updateUsers: (req, res) => {
    var { password } = req.body
    var data = { password }
    var id = req.params.id

    usersModel.updateUsers(data, id).then(result => {
      res.json({
        status: 200,
        message: 'Update Success'
      })
    }).catch(err => {
      res.status(500).json({
        status: 500,
        message: 'Update Failed'
      })
    })
  }
}
