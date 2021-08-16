const path = require("path");
const fs = require("fs");
const { render } = require("../app");

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
};
module.exports = controladorMain;
