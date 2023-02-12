const express = require("express");

const {shop} = require("../controllers/shopController");

const shopRouter = express.Router();

shopRouter.get("/shop", shop);

module.exports = shopRouter;