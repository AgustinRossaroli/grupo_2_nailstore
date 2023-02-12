const express = require("express");

const {iniciarSesion} = require("../controllers/iSesionController");

const iSesionRouter = express.Router(); 

iSesionRouter.get("/register", iniciarSesion);

module.exports = iSesionRouter;