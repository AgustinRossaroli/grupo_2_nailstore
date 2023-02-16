const express = require("express");

const {usersController} = require("../controllers/usersController");

const usersRouter = express.Router(); 

usersRouter.get("/registrate", usersController.login);

usersRouter.get("/iniciarSesion", usersController.iniciarSesion);

module.exports = usersRouter;