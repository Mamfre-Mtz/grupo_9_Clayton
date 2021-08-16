const express = require("express");
const router = express.Router();
const controladorMain = require("../Controllers/mainController");

router.get("/", controladorMain.index);

router.get("/card", controladorMain.card);

router.get("/login", controladorMain.login);

router.get("/register", controladorMain.register);

module.exports = router;
