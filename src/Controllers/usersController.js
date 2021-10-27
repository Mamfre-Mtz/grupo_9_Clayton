const path = require("path");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const db = require("../database/models");
const User = db.user;

const controladorUser = {
  login: (req, res) => {
    return res.render("users/login");
  },

  processLogin: (req, res) => {
    User.findOne({
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
          if (req.body.recordatorio == "on") {
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
        return res.render("users/login", {
          errors: [{ msg: "Porfavor intentelo más tarde" }],
        });
      });
  },

  register: (req, res) => {
    return res.render("users/registro");
  },

  processRegister: (req, res) => {
    let rutafile = "default";
    if (req.file) rutafile = req.file.filename;

    // ***Validaciones
    const resultV = validationResult(req);
    if (resultV.errors.length > 0) {
      return res.render("users/registro", { errors: resultV.errors });
    }

    let newuser = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password, 10),
      avatar: rutafile,
    };
    User.create(newuser)
      .then(() => {
        return res.render("users/login");
      })
      .catch((error) => {
        // valores unicos
        if (error.fields.unique_name) {
          return res.render("users/registro", {
            errors: [{ msg: "Este nombre ya se ha registrado", param: "" }],
          });
        }

        if (error.fields.unique_value) {
          return res.render("users/registro", {
            errors: [
              { msg: "Este nombre y correo ya se han registrado", param: "" },
            ],
          });
        } else console.log(error.fields);
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
