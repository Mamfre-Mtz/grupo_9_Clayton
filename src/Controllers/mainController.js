const path = require("path");
const bcrypt = require("bcryptjs");
const db = require("../database/models");
const Op = db.Sequelize.Op;
const Comic = db.comic;
const Product = db.product;

const controladorMain = {
  index: (req, res) => {
    Comic.findAll({
      limit: 4,
      order: [["id", "DESC"]],
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
        return res.render("index", { lastproducts: finalProducts });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  search: (req, res) => {
    let clave = { busqueda: req.query.keywords };

    Comic.findAll({
      where: {
        [Op.or]: [
          {
            "$editorial_fk.name$": { [Op.like]: `%${clave.busqueda}%` },
          },
          {
            "$product_fk.name$": { [Op.like]: `%${clave.busqueda}%` },
          },
        ],
      },
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
        let results = [];

        for (let comic of comics) {
          results.push({
            ...comic.product_fk.dataValues,
            writer: comic.writer_fk.name,
            editorial: comic.editorial_fk.name,
            editorial_cover: comic.editorial_fk.cover,
            releaseDate: comic.release_date,
          });
        }
        return res.render("results", { productos: results, clave });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  card: (req, res) => {
    return res.render("carrito");
  },
};
module.exports = controladorMain;
