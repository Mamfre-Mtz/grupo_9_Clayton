const path = require("path");
const { body } = require("express-validator");
const validations = [
  body("user_name").notEmpty().withMessage("Tienes que escribir un nombre"),
  body("email").notEmpty().withMessage("Tienes que escribir un correo"),
  body("password").notEmpty().withMessage("Tienes que escribir una contraseña"),
  body("age").notEmpty().withMessage("Tienes que seleccionar una fecha"),
];

module.exports = validations;

// body("pp").custom((value, { req }) => {
//     let file = req.file;
//     let acceptext = [".jpg", ".png", ".gif", ".jpeg", ".PNG", ".JPG"];
//     if (acceptext.includes(path.extname(file.originalname)) !== true) {
//       throw new Error("No se puede subir este tipo de archivo");
//     }
