const express = require("express");
const router = express.Router();
const productosController = require("../Controllers/productosController");

router.get("/productos", productosController.productos);

router.get("/carrito", productosController.carrito);

// Add One Product
router.get("/crear", productosController.add);
router.post("/", productosController.store);

// Get One Product
router.get("/:id", productosController.single);

// Delete One Product
router.get("/:id/borrar", productosController.destroy);

module.exports = router;
