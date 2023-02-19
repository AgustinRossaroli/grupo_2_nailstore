const express = require("express");

const {productsController} = require("../controllers/productsController");

const productsRouter = express.Router();

productsRouter.get("/shop", productsController.shop);
productsRouter.get("/shop/product-creator", productsController.productCreator);
productsRouter.post("/shop/product-creator", productsController.postProductCreator)

productsRouter.get("/carrito", productsController.carrito);

productsRouter.get("/detalle/:id", productsController.detalle);

productsRouter.get("/editar/:id", productsController.editarProducto);
productsRouter.put("/editar", productsController.confirmarEdicion)

module.exports = productsRouter; 