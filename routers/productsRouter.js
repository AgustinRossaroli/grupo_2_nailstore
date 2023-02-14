const express = require("express");

const {carrito, shop, productCreator, postProductCreator, edicion} = require("../controllers/productsController");

const {carrito, editarProducto, detalle, confirmarEdicion, shop, productCreator, postProductCreator} = require("../controllers/productsController");

const productsRouter = express.Router();

productsRouter.get("/carrito", carrito);

productsRouter.get("/detalle/:id", edicion.detalle);

productsRouter.get("/editar/:id", edicion.editarProducto);
productsRouter.put("/editar", edicion.confirmarEdicion)

productsRouter.get("/shop", shop);

productsRouter.get("/shop/product-creator", productCreator);
productsRouter.post("/shop/product-creator", postProductCreator);

module.exports = productsRouter; 