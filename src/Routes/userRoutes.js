const express = require("express");
const uploadFile = require("../Middlewares/multerMiddleware");
const validations = require("../Middlewares/validationsMiddleware");
const guestMid = require("../Middlewares/guestMiddleware");
const authMid = require("../Middlewares/auth.Middleware");
const path = require("path");
const router = express.Router();
const controladorUser = require("../Controllers/usersController");

// Login
router.get("/login", guestMid, controladorUser.login);
router.post("/login", controladorUser.processLogin);

// Registro
router.get("/register", guestMid, controladorUser.register);
router.post(
  "/register",
  validations,
  uploadFile.single("pp"),
  controladorUser.processRegister
);

// Perfil
router.get("/profile/", authMid, controladorUser.profile);

// Logout
router.get("/logout", controladorUser.logout);
module.exports = router;
