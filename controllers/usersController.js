const path = require("path");
const fs = require("fs");
const users = JSON.parse(fs.readFileSync("./data/users.json"), "utf-8");

const usersController = {
    login: (req, res) => {
        res.render(path.resolve(__dirname, "../views/users/login.ejs"));
    },
    iniciarSesion: (req, res) => {
        res.render(path.resolve(__dirname, "../views/users/inicioSesion.ejs"));
    },
    loginUser: (req, res) => {
        const {userName, password} = req.body;
        
        const user = users.find((i) => i.firstName === userName && i.password === password);

        if (user) {
            res.cookie('userSession', userName, { maxAge: 900000, httpOnly: true });
            res.redirect("/home");
        } else {
            res.send("Credenciales incorrectas.");
        };
    }
};

module.exports = {
    usersController
};