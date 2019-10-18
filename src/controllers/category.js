const categoryModel = require("../models/category");

module.exports = {
  getCategory: (req, res) => {
    categoryModel
      .getCategory()
      .then(result => {
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
  },
  addCategory: (req, res) => {
    const { name } = req.body;
    const data = { name };
    // return res.json(data)
    categoryModel
      .addCategory(data)
      .then(result => {
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
  },
  updateCategory: (req, res) => {
    const { name } = req.body;
    const data = { name };

    categoryModel
      .updateCategory([data, { id: req.params.id }])
      .then(result => {
        res.json({
          status: 200,
          message: "Success Updating Data!",
          data: result
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          status: 500,
          message: "Name Already Exist"
        });
      });
  },
  deleteCategory: (req, res) => {
    categoryModel
      .deleteCategory(req.params.id)
      .then(result => {
        res.json({
          status: 200,
          message: "Success Remove Data!",
          data: result
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          status: 500,
          message: "Error Remove Data!"
        });
      });
  }
};
