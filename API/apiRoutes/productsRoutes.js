const express = require("express");
const router = express.Router()
const { productsController } = require("../apiControllers/productsControllers")

router.get("/products", productsController.allProducts)
router.get("/products/:id", productsController.productById)

module.exports = router