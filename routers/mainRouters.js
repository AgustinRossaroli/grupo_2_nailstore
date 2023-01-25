const express = require("express");

const {main} = require("../controllers/mainController");

const mainRouter = express.Router(); 

mainRouter.get("/home", main);

module.exports = mainRouter;