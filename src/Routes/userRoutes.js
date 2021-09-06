const express = require("express");
const multer = require("multer");
const router = express.Router();
const usersController = require("../Controllers/usersController");

router.get("/", usersController.products);

// Add One Product
router.get("/create", usersController.add);
router.post("/store", usersController.store);

// Get One Product
router.get("/:id", usersController.single);

//Edit One Product
router.get("/:id/edit", usersController.edit);
router.put("/:id/save", usersController.save);

// Delete One Product
router.delete("/:id/borrar", usersController.destroy);

module.exports = router;
