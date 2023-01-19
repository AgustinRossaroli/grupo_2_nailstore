const express = require("express");

const mainRouter = express.Router();

const path = require("path");

mainRouter.get("/registro.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../views/registro.html"))
})

module.exports = mainRouter;