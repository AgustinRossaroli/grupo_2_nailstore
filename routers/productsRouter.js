const express = require("express");

const {carrito, editarProducto, detalle, confirmarEdicion, shop, productCreator, postProductCreator} = require("../controllers/productsController");

const productsRouter = express.Router();

productsRouter.get("/shop", shop);
productsRouter.get("/carrito", carrito);

productsRouter.get("/shop/product-creator", productCreator);
productsRouter.post("/shop/product-creator", postProductCreator)

productsRouter.get("/detalle/:id", detalle);

productsRouter.get("/editar/:id", editarProducto);
productsRouter.put("/editar", confirmarEdicion)

module.exports = productsRouter; 