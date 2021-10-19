const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const { v4: getID } = require("uuid");
const User = require("../Models/User");

const controladorUser = {
  users: (req, res) => {
    return res.send("users");
  },
  login: (req, res) => {
    return res.render("users/login");
  },
  processLogin: (req, res) => {
    let userReady = User.findByField("email", req.body.email);
    if (userReady) {
      let checkpass = bcryptjs.compareSync(
        req.body.password,
        userReady.password
      );
      if (checkpass) {
        delete userReady.password;
        req.session.userLogged = userReady;
        if (req.body.recordatorio) {
          res.cookie("userEmail", req.body.email);
        }
        return res.redirect("/users/profile");
      }
    }

    return res.render("users/login", {
      errors: [{ msg: "Credenciales incorrectas" }],
    });
  },

  register: (req, res) => {
    return res.render("users/registro");
  },

  processRegister: (req, res) => {
    const resultV = validationResult(req);
    if (resultV.errors.length > 0) {
      return res.render("users/registro", { errors: resultV.errors });
    }
    if (User.findByField("email", req.body.email)) {
      return res.render("users/registro", {
        errors: [{ msg: "Este correo ya se ha registrado", param: "" }],
      });
    }
    let usercreate = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password, 10),
      avatar: req.file.filename,
    };
    User.create(usercreate);
    return res.render("users/login");
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
