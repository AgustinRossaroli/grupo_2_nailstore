const express = require("express");

const {login} = require("../controllers/loginController");

const loginRouter = express.Router(); 

loginRouter.get("/login", login);

module.exports = loginRouter;