const express = require('express');
const router =  express.Router();
const productosController = require('../Controllers/productosController');

router.get('/productos',productosController.productos);

router.get('/carrito', productosController.carrito);

module.exports = router;