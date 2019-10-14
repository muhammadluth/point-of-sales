const categoryModel = require('../models/category')
const redis = require('redis')
const client = redis.createClient()
const categoryRedKey = "users: category"

module.exports = {
  getCategory: (req, res) => {
    return client.get(categoryRedKey, (err, category) => {
      if(category) {
        const result = JSON.parse(category);
        return res.json({
          from: 'cache',
          status: 200,
          data: result,
          message: 'Show data Success'
        })
      }else{
      categoryModel.getCategory()
      .then(result => {
        client.setex(categoryRedKey, 3600, JSON.stringify(result));
        res.json({
          status: 200,
          message: 'Success View a Data!',
          data: (result)
        })
      })
      .catch(err => {
        console.log(err)
        res.json({
          status: 500,
          message: 'Error View a Data!'
        })
      })
      }
    })
    
  },
  addCategory: (req, res) => {
    const { name } = req.body
    const data = { name }
    // return res.json(data)
    categoryModel.addCategory(data)
      .then(result => {
        client.del(categoryRedKey, (err,replay) =>{
          console.log(replay)

        });
        res.json({
          status: 200,
          message: 'Success Adding Data!',
          data: result
        })
      })
      .catch(err => {
        console.log(err)
        res.json({
          status: 500,
          message: 'Error Adding Data!'
        })
      })
  },
  updateCategory: (req, res) => {
    const { name } = req.body
    const data = { name }

    categoryModel.updateCategory([data, { id: req.params.id }])
      .then(result => {
        client.del(categoryRedKey, (err,replay) =>{
          console.log(replay)

        });
        res.json({
          status: 200,
          message: 'Success Updating Data!',
          data: result
        })
      })
      .catch(err => {
        console.log(err)
        res.json({
          status: 500,
          message: 'Name Already Exist'
        })
      })
  },
  deleteCategory: (req, res) => {
    categoryModel.deleteCategory(req.params.id)
      .then(result => {
        client.del(categoryRedKey, (err,replay) =>{
          console.log(replay)

        });
        res.json({
          status: 200,
          message: 'Success Remove Data!',
          data: result
        })
      })
      .catch(err => {
        console.log(err)
        res.json({
          status: 500,
          message: 'Error Remove Data!'
        })
      })
  }
}
