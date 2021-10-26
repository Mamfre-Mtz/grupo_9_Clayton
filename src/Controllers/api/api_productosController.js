const { Sequelize } = require("../../database/models");
const db = require("../../database/models");
const { edit } = require("../productosController");
const Op = db.Sequelize.Op;
const Producto = db.product;
const Comic = db.comic;

const apiProductController = {
  list: (req, res) => {
    let promisecount = Comic.count();
    let promiseCategory = db.editorial.findAll();
    let promiseComics = Comic.findAll({
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
    Promise.all([promisecount, promiseCategory, promiseComics])
      .then((values) => {
        let finalProducts = [];
        let byEditorial = [];
        // Editorial
        for (editorial of values[1]) {
          byEditorial.push({ id: editorial.id, name: editorial.name });
        }
        // product
        for (let comic of values[2]) {
          finalProducts.push({
            ...comic.product_fk.dataValues,
            writer: comic.writer_fk.name,
            editorial: comic.editorial_fk.name,
            editorial_cover: comic.editorial_fk.cover,
            coverUrl:
              "localhost:3000//assets/img/comicIssues/" +
              comic.product_fk.dataValues.cover,
            releaseDate: comic.release_date,
          });
        }
        for (i = 0; i < byEditorial.length; i++) {
          let pivote = finalProducts.filter(
            (product) => product.editorial == byEditorial[i].name
          );
          byEditorial[i] = {
            ...byEditorial[i],
            count: pivote.length,
            comics: pivote,
          };
        }

        return res.send({
          count: values[0],
          category: byEditorial,
          comics: finalProducts,
        });
      })
      .catch((error) => {});
  },
  single: (req, res) => {
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
    }).then((single_comic) => {
      let singleProduct = {
        ...single_comic.product_fk.dataValues,
        writer: single_comic.writer_fk.name,
        editorial: single_comic.editorial_fk.name,
        editorial_cover: single_comic.editorial_fk.cover,
        datePublished: single_comic.release_date,
      };
      return res.send(singleProduct);
    });
  },
  writerlist: (req, res) => {
    db.writer
      .count()
      .then((c) => {
        db.writer.findAll().then((result) => {
          return res.send({ count: c, writers: result });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
  editoriallist: (req, res) => {
    db.editorial
      .count()
      .then((c) => {
        db.editorial.findAll().then((result) => {
          return res.send({ count: c, editorials: result });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

module.exports = apiProductController;
