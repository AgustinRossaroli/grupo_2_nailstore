const express = require("express");

const {carrito, editarProducto, detalle, confirmarEdicion} = require("../controllers/productsController");

const productsRouter = express.Router();

productsRouter.get("/carrito", carrito);

productsRouter.get("/detalle/:id", detalle);

productsRouter.get("/editar/:id", editarProducto);
productsRouter.put("/editar", confirmarEdicion)

module.exports = productsRouter; 