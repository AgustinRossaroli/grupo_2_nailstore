const express = require("express");

const {iniciarSesion} = require("../controllers/iSesionController");

const iSesionRouter = express.Router(); 

iSesionRouter.get("/iniciar%20sesion", iniciarSesion);

module.exports = iSesionRouter;