const express = require("express");

const {login, iniciarSesion} = require("../controllers/usersController");

const usersRouter = express.Router(); 

usersRouter.get("/login", login);

usersRouter.get("/register", iniciarSesion);

module.exports = usersRouter;