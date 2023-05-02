const express = require("express");
const router = express.Router()
const { allProducts } = require("../apiControllers/productsControllers")

router.get("/", allProducts)

module.exports = router