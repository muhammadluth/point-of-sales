const conn = require('../configs/db')

module.exports = {
  getProduct: (search, limit, page = 1, name) => {
    console.log(limit, page)
    return new Promise((resolve, reject) => {
      conn.query(`SELECT product.id, product.name, product.description, product.image, category.name as category, product.price, product.qty, product.created_at, product.update_at FROM product JOIN category ON product.category_id = category.id 
            ${search ? `WHERE product.name LIKE '%${search}%'` : ''} ${limit ? `LIMIT ${limit} OFFSET ${(page - 1) * limit}` : ''} ${name ? `ORDER BY ${name}` : ''}`,
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getByName: (name) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT COUNT(id) AS product FROM product WHERE name = ?', [name],
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
    })
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM product WHERE id = ?', [id],
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
    })
  },
  addProduct: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO product SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateProduct: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE product SET ? WHERE ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  // updateImage: (image) =>{

  // },
  deleteProduct: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE from product where id=?', [data], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  reduceProduct: (id, qty) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * from product WHERE id = ?', id, (err, result) => {
        if (result.length >= 0) {
          const quantity = result[0].qty - qty
          if (quantity >= 0) {
            conn.query('UPDATE product SET qty = ? WHERE id = ?', [quantity, id], (err, update) => {
              if (!err) {
                resolve(result)
              } else {
                reject(new Error(err))
              }
            })
          } else {
            reject(new Error(err))
          }
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
