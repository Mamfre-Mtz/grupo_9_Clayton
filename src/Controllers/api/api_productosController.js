const db = require("../../database/models");
const Producto = db.product;
const Comic = db.comic;

const apiProductController = {
  list: (req, res) => {
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
    }).then((comics) => {
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
      return res.send(finalProducts);
    });
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
  writerlist: (req, res) => {},
  editoriallist: (req, res) => {},
};

module.exports = apiProductController;
