const express = require("express");
const router = express.Router();
const productApiController = require("../../Controllers/api/api_productosController");

// Rutas

router.get("/", productApiController.list);
router.get("/:id", productApiController.single);

module.exports = router;
