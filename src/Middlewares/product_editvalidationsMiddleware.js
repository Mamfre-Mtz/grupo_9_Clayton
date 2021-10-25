const path = require("path");
const { body } = require("express-validator");
const validations = [
  body("name")
    .isLength({ min: 5 })
    .withMessage("Tienes que escribir un nombre con almenos 5 caracteres"),

  body("description")
    .isLength({ min: 20 })
    .withMessage("La descripción debe contener al menos 20 caracteres"),

  body("cover").custom((value, { req }) => {
    let file = req.file;
    let acceptext = [".jpg", ".png", ".gif", ".jpeg", ".PNG", ".JPG"];
    if (file) {
      if (!acceptext.includes(path.extname(file.originalname))) {
        throw new Error("No se puede subir este tipo de archivo");
      } else {
        return true;
      }
    } else {
      return true;
    }
  }),
];

module.exports = validations;
