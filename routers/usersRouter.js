const express = require("express");

const {usersController} = require("../controllers/usersController");

const usersRouter = express.Router(); 

usersRouter.get("/iniciarSesion", usersController.login);
usersRouter.post("/iniciarSesion", usersController.loginUser);

usersRouter.get("/registrate", usersController.iniciarSesion);


module.exports = usersRouter;