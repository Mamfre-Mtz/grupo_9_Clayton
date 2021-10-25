const express = require("express");
const uploadFile = require("../Middlewares/product_multerMiddleware");
const validations = require("../Middlewares/product_validationsMiddleware");
const router = express.Router();
const productosController = require("../Controllers/productosController");

router.get("/", productosController.products);

// Add One Product
router.get("/create", productosController.add);
router.post(
  "/create",
  uploadFile.single("cover"),
  validations,
  productosController.store
);

// Get One Product
router.get("/:id", productosController.single);

//Edit One Product
router.get("/:id/edit", productosController.edit);
router.put("/:id/edit", productosController.save);

// Delete One Product
router.delete("/:id/edit", productosController.destroy);

module.exports = router;
