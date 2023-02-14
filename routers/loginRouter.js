const express = require("express");

const {login} = require("../controllers/usersController");

const loginRouter = express.Router(); 

loginRouter.get("/login", login);

module.exports = loginRouter;