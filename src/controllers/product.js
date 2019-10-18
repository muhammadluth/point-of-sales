const productModel = require("../models/product");
const uuid = require("uuid/v4");
const fs = require("fs").promises;

module.exports = {
  getProduct: (req, res) => {
    const { search, limit, page, sort } = req.query;

    productModel
      .getProduct(search, limit, page, sort)
      .then(async result => {
        let allData = await productModel.getAll();
        res.json({
          status: 200,
          message: "Success View a Data!",
          allData: allData[0].allData,
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
  getDesc: (req, res) => {
    const { sort } = req.query;

    productModel
      .getDesc(sort)
      .then(async result => {
        let allData = await productModel.getAll();
        res.json({
          status: 200,
          message: "Success View a Data!",
          allData: allData[0].allData,
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
  getById: (req, res) => {
    const { id } = req.params;

    productModel
      .getById(id)
      .then(result => {
        res.json({
          status: 200,
          message: "SUKSES!!!",
          data: result
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          status: 500,
          message: "ERROR!!!"
        });
      });
  },
  addProduct: async (req, res) => {
    const { name, description, category_id, price, qty } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were Add!");
    }

    const images = req.files.image;

    const image = uuid() + `.${req.files.image.mimetype.split("/")[1]}`;

    const img = ["png", "jpg", "jpeg", "svg", "gif"].includes(
      req.files.image.mimetype.split("/")[1]
    );
    if (!img) {
      return res.json({
        status: 400,
        message: 'File must be an image ("png","jpg","jpeg","svg","gif")!'
      });
    }

    images.mv("uploads/images/" + image, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
    });

    const data = { name, description, image, category_id, price, qty };
    // return res.json(data)
    if (req.files.image) {
      if (req.body.qty >= 0) {
        const isProductAvailable = await productModel.getByName(name);
        console.log(isProductAvailable[0].product);
        if (isProductAvailable[0].product == 0) {
          productModel
            .addProduct(data)
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
                message: "Error Adding New Data!"
              });
            });
        } else {
          res.json({
            status: 400,
            message: "Error, Product already in database!",
            name
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          message: "Quantity cannot below 0"
        });
      }
    }
  },
  updateProduct: (req, res) => {
    const { name, description, category_id, price, qty } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded!");
    }

    const images = req.files.image;

    const image = uuid() + `.${req.files.image.mimetype.split("/")[1]}`;

    const img = ["png", "jpg", "jpeg", "svg", "gif"].includes(
      req.files.image.mimetype.split("/")[1]
    );
    if (!img) {
      return res.json({
        status: 400,
        message: 'File must be an image ("png","jpg","jpeg","svg","gif")!'
      });
    }

    images.mv("uploads/images/" + image, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
    });

    productModel
      .getById(req.params.id)
      .then(([result]) => {
        console.log(result);
        fs.unlink(`uploads/images/${result.image}`).catch(err => {});
      })
      .then(() => {
        const data = { name, description, image, category_id, price, qty };
        return productModel.updateProduct([data, { id: req.params.id }]);
      })
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
          message: "Name is Already Exist!"
        });
      });
  },
  deleteProduct: (req, res) => {
    const id = req.params;

    productModel
      .deleteProduct(id)
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
          message: "Error Remove a Data!"
        });
      });
  },
  reduceProduct: (req, res) => {
    const id = req.params.id;
    const { qty } = req.body;

    productModel
      .reduceProduct(id, qty)
      .then(result => {
        res.json({
          status: 200,
          message: "Success Reduce Data!",
          data: result
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          status: 500,
          message: "Error Count a Data!"
        });
      });
  }
};
