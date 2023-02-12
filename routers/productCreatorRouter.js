const express = require("express");

const {productCreator, postProductCreator} = require("../controllers/productCreatorController");

const productCreatorRouter = express.Router();

productCreatorRouter.get("/shop/product-creator", productCreator);
productCreatorRouter.post("/shop/product-creator", postProductCreator);

module.exports = productCreatorRouter;