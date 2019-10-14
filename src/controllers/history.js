const historyModel = require("../models/history");
const redis = require("redis");
const client = redis.createClient();
const historyRedKey = "users: history";

module.exports = {
  getHistory: (req, res) => {
    return client.get(historyRedKey, (err, history) => {
      if (history) {
        const result = JSON.parse(history);
        return res.json({
          from: "cache",
          status: 200,
          data: result,
          message: "Show data Success"
        });
      } else {
        historyModel
          .getHistory()
          .then(result => {
            client.setex(historyRedKey, 3600, JSON.stringify(result));
            res.json({
              status: 200,
              message: "Success View a Data!",
              data: result
            });
          })
          .catch(err => {
            console.log(err);
            res.json({
              status: 500,
              message: "Error View a Data!"
            });
          });
      }
    });
  },
  addHistory: (req, res) => {
    const { invoices, user, orders, amount } = req.body;
    const data = { invoices, user, orders, amount };
    // return res.json(data)
    historyModel
      .addHistory(data)
      .then(result => {
        client.del(historyRedKey, (err, replay) => {
          console.log(replay);
        });
        res.json({
          status: 200,
          message: "Success Adding Data!",
          data: result
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          status: 500,
          message: "Error Adding Data!"
        });
      });
  }
};
