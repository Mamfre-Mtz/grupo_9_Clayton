const path = require("path");
const fs = require("fs");
const { v4: getID } = require("uuid");
const { render } = require("../app");
const { get } = require("https");

const productsFilePath = path.join(__dirname, "../Database_test/products.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
const db = require("../database/models");
const sequelize = db.sequelize;
const Comic = db.comic;

const controlador = {
  products: (req, res) => {
    // Render todos los productos
    Comic.findAll()
      .then((comics) => {
        return res.send(comics);
        // return res.render("products/productos", { productos });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  add: (req, res) => {
    //Te lleva a la lista de añadir productos
    res.render("products/crearProducto");
  },

  store: (req, res) => {
    // Guarda el nuevo producto
    console.log(req.body);
    let newproducto = {
      id: getID(),
      name: req.body.name,
      editorial: req.body.editorial,
      writer: req.body.writer,
      available: req.body.status,
      price: req.body.price,
      cover: "spidey_05.jpg",
      description: req.body.description,
      releaseDate: req.body.datePublished,
      discount: req.body.discount,
    };
    products.push(newproducto);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.redirect("/products");
  },

  edit: (req, res) => {
    // Te lleva a la vista de editar producto
    let single = req.params.id;
    let singleProduct = products.filter((product) => product.id == single);
    res.render("products/editarProducto", { singleProduct });
  },

  save: (req, res) => {
    // Guarda los cambios en el producto
    for (product of products) {
      if (product.id == req.params.id) {
        for (key in product) {
          if (key !== "id" && key !== "cover" && key !== "coverImage") {
            product[key] = req.body[key];
          }
        }
        break;
      }
    }
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.redirect("/products/" + req.params.id);
  },

  destroy: (req, res) => {
    // Elimina el producto
    let deleteproduct = products.findIndex(
      (product) => product.id == req.params.id
    );
    products.splice(deleteproduct, 1);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    res.redirect("/products");
  },

  single: (req, res) => {
    // Trae la vista detalles del producto
    let single = req.params.id;
    let singleProduct = products.filter((product) => product.id == single);
    res.render("products/detallesProducto", { singleProduct });
  },
};

module.exports = controlador;
