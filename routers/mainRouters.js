const express = require("express");

const {mainController} = require("../controllers/mainController");

const mainRouter = express.Router(); 

mainRouter.get("/home", mainController.main);
mainRouter.get("/aboutUs", mainController.aboutUs);

module.exports = mainRouter;