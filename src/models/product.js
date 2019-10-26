const conn = require("../configs/db");
const fs = require("fs");

module.exports = {
  getProduct: (search, limit, page = 1, name) => {
    console.log(limit, page);
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT product.id, product.name, product.description, product.image, category.name as category, product.price, product.qty, product.created_at, product.update_at FROM product JOIN category ON product.category_id = category.id 
            ${search ? `WHERE product.name LIKE '%${search}%'` : ""} ${
          name ? `ORDER BY ${name}` : ""
        } ${limit ? `LIMIT ${limit} OFFSET ${(page - 1) * limit}` : ""}`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getByName: name => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT COUNT(id) AS product FROM product WHERE name = ?",
        [name],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  getAll: () => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT COUNT(id) as allData FROM product", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getById: id => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * FROM product WHERE id = ?", [id], (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getDesc: name => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT product.id, product.name, product.description, product.image, category.name as category, product.price, product.qty, product.created_at, product.update_at FROM product JOIN category ON product.category_id = category.id ${
          name ? `ORDER BY ${name} DESC` : ""
        } `,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  addProduct: data => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT INTO product SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },

  updateProduct: (data, id) => {
    console.log(data.image);
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * from product WHERE id = ?",
        id,
        (err, resultSelect) => {
          image = resultSelect[0].image;
          if (resultSelect.length > 0) {
            conn.query(
              "UPDATE product SET ? WHERE id = ?",
              [data, id],
              (err, result) => {
                if (!err) {
                  if (fs.existsSync("uploads/images/" + resultSelect[0].image))
                    fs.unlinkSync("uploads/images/" + resultSelect[0].image);
                  resolve(result);
                } else {
                  reject(new Error(err));
                }
              }
            );
          } else {
            reject("ID NOT FOUND!");
          }
        }
      );
    });
  },
  deleteProduct: id => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT image FROM product WHERE ?", [id], (err, result) => {
        let image = result[0].image;
        conn.query("DELETE from product WHERE ?", [id], (err, result) => {
          if (!err) {
            if (image !== null) {
              fs.unlink(`./uploads/images/${image}`, err => {
                if (err) {
                  console.log(err);
                } else {
                  result = "Image deleted!";
                  resolve(result);
                }
              });
            }
          } else {
            reject(new Error(err));
          }
        });
      });
    });
  },
  reduceProduct: (id, qty) => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * from product WHERE id = ?", id, (err, result) => {
        if (result.length >= 0) {
          const quantity = result[0].qty - qty;
          if (quantity >= 0) {
            conn.query(
              "UPDATE product SET qty = ? WHERE id = ?",
              [quantity, id],
              (err, update) => {
                if (!err) {
                  resolve(result);
                } else {
                  reject(new Error(err));
                }
              }
            );
          } else {
            reject(new Error(err));
          }
        } else {
          reject(new Error(err));
        }
      });
    });
  }
};
