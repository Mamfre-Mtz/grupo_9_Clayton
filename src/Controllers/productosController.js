const path = require("path");
const db = require("../database/models");
const { validationResult } = require("express-validator");
const Comic = db.comic;
const Product = db.product;

const controlador = {
  products: (req, res) => {
    // Render todos los productos
    Comic.findAll({
      include: [
        {
          model: db.editorial,
          as: "editorial_fk",
          attributes: ["id", "name", "cover"],
        },
        { model: db.writer, as: "writer_fk", attributes: ["id", "name"] },
        { model: db.product, as: "product_fk" },
      ],
    })
      .then((comics) => {
        let finalProducts = [];

        for (let comic of comics) {
          finalProducts.push({
            ...comic.product_fk.dataValues,
            writer: comic.writer_fk.name,
            editorial: comic.editorial_fk.name,
            editorial_cover: comic.editorial_fk.cover,
            releaseDate: comic.release_date,
          });
        }
        return res.render("products/productos", { productos: finalProducts });
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
    // ***Validaciones
    const resultV = validationResult(req);
    if (resultV.errors.length > 0) {
      return res.render("products/crearProducto", { errors: resultV.errors });
    }
    // Guarda el nuevo producto
    let status = 0;
    req.body.status == "on" ? (status = 1) : (status = 0);

    let newproduct = {
      name: req.body.name,
      available: status,
      price: req.body.price,
      cover: req.file.filename,
      description: req.body.description,
      discount: req.body.discount,
      type: "comic",
    };
    Product.create(newproduct)
      .then((result) => {
        Comic.create({
          release_date: req.body.datePublished,
          writer_id: req.body.writer,
          editorial_id: req.body.editorial,
          product_id: result.id,
        })
          .then((finalresult) => {
            return res.redirect("/products");
          })
          .catch((error) => {
            if (error.fields.unique_name) {
              return res.render("products/crearProducto", {
                errors: [{ msg: "Este nombre ya se ha registrado", param: "" }],
              });
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  edit: (req, res) => {
    // Te lleva a la vista de editar producto
    let single = req.params.id;
    const writersList = db.writer.findAll();
    const editorialList = db.editorial.findAll();
    const currentComic = Comic.findOne({
      where: { product_id: single },
      include: [
        {
          model: db.editorial,
          as: "editorial_fk",
          attributes: ["id", "name", "cover"],
        },
        { model: db.writer, as: "writer_fk", attributes: ["id", "name"] },
        { model: db.product, as: "product_fk" },
      ],
    });
    Promise.all([writersList, editorialList, currentComic])
      .then((values) => {
        let singleProduct = {
          ...values[2].product_fk.dataValues,
          writer: values[2].writer_fk.id,
          editorial: values[2].editorial_fk.id,
          editorial_cover: values[2].editorial_fk.cover,
          datePublished: values[2].release_date,
        };
        res.render("products/editarProducto", {
          singleProduct: singleProduct,
          writers: values[0],
          editorials: values[1],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  save: (req, res) => {
    // Guarda los cambios en el producto
    let status = 0;
    req.body.status == "on" ? (status = 1) : (status = 0);

    let updateProduct = {
      name: req.body.name,
      available: status,
      price: req.body.price,
      cover: req.file.filename,
      description: req.body.description,
      discount: req.body.discount,
    };
    Product.update(updateProduct, { where: { id: req.params.id } })
      .then(() => {
        Comic.update(
          {
            writer_id: req.body.writer,
            editorial_id: req.body.editorial,
            release_date: req.body.datePublished,
          },
          { where: { product_id: req.params.id } }
        )
          .then(() => {
            res.redirect("/products/" + req.params.id);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => console.log(error));
  },

  destroy: (req, res) => {
    // Elimina el producto
    Product.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        return res.redirect("/products");
      })
      .catch((error) => {
        console.log(error);
      });
  },

  single: (req, res) => {
    // Trae la vista detalles del producto
    let single = req.params.id;
    Comic.findOne({
      where: { product_id: single },
      include: [
        {
          model: db.editorial,
          as: "editorial_fk",
          attributes: ["id", "name", "cover"],
        },
        { model: db.writer, as: "writer_fk", attributes: ["id", "name"] },
        { model: db.product, as: "product_fk" },
      ],
    })
      .then((single_comic) => {
        let singleProduct = {
          ...single_comic.product_fk.dataValues,
          writer: single_comic.writer_fk.name,
          editorial: single_comic.editorial_fk.name,
          editorial_cover: single_comic.editorial_fk.cover,
          datePublished: single_comic.release_date,
        };
        return res.render("products/detallesProducto", { singleProduct });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

module.exports = controlador;
