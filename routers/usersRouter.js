const express = require("express");

const {login, iniciarSesion} = require("../controllers/usersController");

const usersRouter = express.Router(); 

usersRouter.get("/registrar", login);

usersRouter.get("/iniciarSesion", iniciarSesion);

module.exports = usersRouter;