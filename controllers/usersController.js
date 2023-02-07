const path = require("path");

const login = (req,res) => {
    res.render(path.resolve(__dirname, "../views/users/login.ejs"));
};
const iniciarSesion = (req,res) => {
    res.render(path.resolve(__dirname, "../views/users/inicioSesion.ejs"));
};

module.exports = {
    login,
    iniciarSesion
};