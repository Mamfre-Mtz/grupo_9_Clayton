const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const productsFilePath = path.join(__dirname, "../Database/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controladorMain = {
  index: (req, res) => {
    let lastproducts = products.slice(-4);

    res.render("index", { lastproducts });
  },
  register: (req, res) => {
    res.render("registro");
  },
  login: (req, res) => {
    res.render("login");
  },

  card: (req, res) => {
    res.render("carrito");
  },
  newuser: (req, res, next) => {
    const file = req.file;
    if (!file) {
      const error = new Error("Por favor seleccione un archivo valido");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send("hi");
  },
};
module.exports = controladorMain;
