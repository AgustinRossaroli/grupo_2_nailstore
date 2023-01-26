const express = require("express");

const {carrito} = require("../controllers/carritoController");

const carritoRouter = express.Router();

carritoRouter.get("/carrito", carrito);

module.exports = carritoRouter;