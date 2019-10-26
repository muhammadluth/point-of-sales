const usersModel = require("../models/users");
const conn = require(".././configs/db");
const jwt = require("jsonwebtoken");
const config = require("../../auth/config");
const bcrypt = require("bcrypt");
const Joi = require("joi");

module.exports = {
  login: (req, res) => {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email({
          minDomainAtoms: 2
        })
        .required(),
      password: Joi.string().required()
    });

    const result = Joi.validate(req.body, schema);

    if (result.error) {
      return res.status(400).send({
        status: 400,
        message: result.error.details[0].message
      });
    }

    const { email, password } = result.value;
    if (email && password) {
      conn.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, [result]) => {
          if (!result) {
            return res.json({
              success: 400,
              message: "Account not Found!"
            });
          }
          bcrypt.compare(password, result.password, (err, valid) => {
            if (valid) {
              const token = jwt.sign(
                {
                  email: email
                },
                config.secret,
                {
                  expiresIn: "1h"
                }
              );
              return res.json({
                success: 200,
                message: "Login success",
                username: result.username,
                email: email,
                token: token
              });
            }
            res.json({
              success: 403,
              message: "Your password invalid"
            });
          });
        }
      );
    } else {
      res.json({
        success: 400,
        message: "Please insert user and paswword"
      });
    }
  },
  getAllUsers: (req, res) => {
    usersModel
      .getAllUsers()
      .then(result => {
        res.json({
          status: 200,
          message: "Success Viewing Users!",
          data: result
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          status: 500,
          message: "Error Viewing Users!"
        });
      });
  },
  register: (req, res) => {
    const schema = Joi.object().keys({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required(),
      password: Joi.string().required()
    });

    const result = Joi.validate(req.body, schema);

    if (result.error) {
      return res.status(400).send({
        status: 400,
        message: result.error.details[0].message
      });
    }

    const { username, email, password } = result.value;

    usersModel
      .register(username, email, password)
      .then(result => {
        res.json({
          status: 200,
          message: "Registration Success"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          status: 500,
          message: "Registration Failed, Because Duplicate Email "
        });
      });
  },
  updateUsers: (req, res) => {
    var { password } = req.body;
    var data = { password };
    var id = req.params.id;

    usersModel
      .updateUsers(data, id)
      .then(result => {
        res.json({
          status: 200,
          message: "Update Success"
        });
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: "Update Failed"
        });
      });
  }
};
