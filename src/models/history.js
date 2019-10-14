const conn = require("../configs/db");

module.exports = {
  getHistory: () => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * from history", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  addHistory: data => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT INTO history SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  }
};
