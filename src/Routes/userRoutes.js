const express = require("express");
const uploadFile = require("../Middlewares/multerMiddleware");
const validations = require("../Middlewares/validationsMiddleware");
const path = require("path");
const router = express.Router();
const controladorUser = require("../Controllers/usersController");

// Login
router.get("/login", controladorUser.login);
router.post("/login", controladorUser.processLogin);

// Registro
router.get("/register", controladorUser.register);
router.post(
  "/register",
  uploadFile.single("pp"),
  validations,
  controladorUser.processRegister
);

// Perfil
module.exports = router;
