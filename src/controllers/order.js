const orderModel = require("../models/order");
module.exports = {
  // grafik
  getRevenue: (req, res) => {
    let orderBy = req.query.order;
    // console.log(orderBy)
    orderBy = typeof orderBy !== "undefined" ? orderBy : "week";
    orderModel
      .getRevenue(orderBy)
      .then(result => {
        res.json({
          status: 200,
          message: "success getting all data",
          data: result
        });
      })
      .catch(err => {
        res.status(400).json({
          status: 400,
          message: "error getting data"
        });
      });
  },
  getAllOrder: (req, res) => {
    orderModel
      .getAllOrder()
      .then(result => {
        res.json({
          status: 200,
          message: "success getting count order",
          data: result
        });
      })
      .catch(err => {
        res.status(400).json({
          status: 400,
          message: "error getting data count order"
        });
      });
  },
  getRecentOrder: (req, res) => {
    // console.log('grOrder' +);
    orderModel
      .getRecentOrder(req.query.order)
      .then(result => {
        res.json({
          status: 200,
          message: "success getting count order",
          data: result
        });
      })
      .catch(err => {
        res.status(400).json({
          status: 400,
          message: "error getting data count order"
        });
      });
  }
};
