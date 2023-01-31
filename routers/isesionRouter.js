const express = require("express");

const {iniciarSesion} = require("../controllers/iSesionController");

const iSesionRouter = express.Router(); 

iSesionRouter.get("/iniciarSesion", iniciarSesion);

module.exports = iSesionRouter;