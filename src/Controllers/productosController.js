const path = require("path");
const controlador = {
  productos: (req, res) => {
    res.render("productos");
  },

  carrito: (req, res) => {
    res.render("carrito");
  },

  add: (req, res) => {},
  store: (req, res) => {},
  destroy: (req, res) => {},

  single: (req, res) => {
    res.render("detallesProducto");
  },
};

module.exports = controlador;
