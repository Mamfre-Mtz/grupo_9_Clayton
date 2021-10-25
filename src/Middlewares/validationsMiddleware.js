const path = require("path");
const { body } = require("express-validator");
const validations = [
  body("name")
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("Tienes que escribir un nombre con almenos 2 caracteres"),

  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Tienes que escribir un correo valido"),

  body("password")
    .notEmpty()
    .isLowercase()
    .withMessage("Solo minúsculas porfavor")
    .isLength({ min: 8 })
    .withMessage("La contraseña tiene que ser almenos de 8 caracteres"),

  body("pp").custom((value, { req }) => {
    let file = req.file;
    let acceptext = [".jpg", ".png", ".gif", ".jpeg", ".PNG", ".JPG"];
    if (file) {
      if (!acceptext.includes(path.extname(file.originalname))) {
        throw new Error("No se puede subir este tipo de archivo");
      } else {
        return true;
      }
    }
    return true;
  }),
];

module.exports = validations;
