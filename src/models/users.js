const conn = require('../configs/db')
const bcrypt = require('bcrypt')

module.exports = {
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT username FROM users', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  register: (username, email, passwordNotHash) => {
    return new Promise((resolve, reject) => {
          bcrypt.hash(passwordNotHash, 10, (err, password) => {
            if (err) return reject(err)
            const data = { username, email, password }
            conn.query(`INSERT INTO users SET ?`, data, (err, res) => {
              if (!err) {
                resolve(res)
              } else {
                reject(err)
              }
            })
          })
    })
  }
}
