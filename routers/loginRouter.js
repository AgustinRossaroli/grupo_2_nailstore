const express = require("express");

const {login} = require("../controllers/loginController");

const loginRouter = express.Router(); 

loginRouter.get("/registrar", login);

module.exports = loginRouter;