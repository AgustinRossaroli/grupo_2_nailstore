const express = require("express");

const {product} = require("../controllers/productController");

const productRouter = express.Router();

productRouter.get("/productDetail", product);

module.exports = productRouter;