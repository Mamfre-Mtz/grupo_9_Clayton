const path = require("path");
const controlador = {
  productos: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/productos.html"));
  },

  carrito: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/carrito.html"));
  },

  add: (req, res) => {},
  store: (req, res) => {},
  destroy: (req, res) => {},

  single: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/producto.html"));
  },
};

module.exports = controlador;
