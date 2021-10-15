const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const productsFilePath = path.join(__dirname, "../Database/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const controladorMain = {
  index: (req, res) => {
    let lastproducts = products.slice(-4);

    return res.render("index", { lastproducts });
  },

  search: (req, res) => {
    let clave = { busqueda: req.query.keywords };
    let busqueda = products.filter(
      (product) =>
        product.name.includes(clave.busqueda) ||
        product.editorial.includes(clave.busqueda)
    );
    return res.render("results", { productos: busqueda, clave });
  },

  card: (req, res) => {
    return res.render("carrito");
  },
};
module.exports = controladorMain;
