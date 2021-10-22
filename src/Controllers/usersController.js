const path = require("path");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const User = require("../Models/User");
const db = require("../database/models");
const Userr = db.user;

const controladorUser = {
  login: (req, res) => {
    return res.render("users/login");
  },

  processLogin: (req, res) => {
    Userr.findOne({
      where: { email: req.body.email },
    })
      .then((userReady) => {
        let checkpass = false;
        if (userReady) {
          checkpass = bcryptjs.compareSync(
            req.body.password,
            userReady.password
          );
        }
        if (checkpass) {
          delete userReady.password;
          req.session.userLogged = userReady;
          if (req.body.recordatorio) {
            res.cookie("userEmail", req.body.email);
          }
          return res.redirect("/users/profile");
        } else {
          return res.render("users/login", {
            errors: [{ msg: "Credenciales incorrectas" }],
          });
        }
      })
      .catch(() => {
        return res.send("pura vvvv");
      });
  },

  register: (req, res) => {
    return res.render("users/registro");
  },

  processRegister: (req, res) => {
    // ***Validaciones
    // const resultV = validationResult(req.errors);
    // if (resultV.length > 0) {
    //   return res.render("users/registro", { errors: resultV });
    // }
    // if (User.findByField("email", req.body.email)) {
    //   return res.render("users/registro", {
    //     errors: [{ msg: "Este correo ya se ha registrado", param: "" }],
    //   });
    // }
    let newuser = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password, 10),
      avatar: req.file.filename,
    };
    Userr.create(newuser)
      .then(() => {
        return res.render("users/login");
      })
      .catch((error) => {
        console.log(error);
      });
  },
  profile: (req, res) => {
    return res.render("users/profile", { user: req.session.userLogged });
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("userEmail");
    return res.redirect("/users/login");
  },
};

module.exports = controladorUser;
