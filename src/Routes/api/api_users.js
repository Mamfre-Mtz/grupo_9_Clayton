const express = require("express");
const router = express.Router();
const userApiController = require("../../Controllers/api/api_usersController");

// Rutas

router.get("/", userApiController.list);
router.get("/:id", userApiController.single);

router.get("/country/:name", userApiController.countrylist);
module.exports = router;
