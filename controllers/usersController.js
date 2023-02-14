const path = require("path");

const usersController = {
    login: (req,res) => {
    res.render(path.resolve(__dirname, "../views/users/login.ejs"));
},
    iniciarSesion: (req,res) => {
    res.render(path.resolve(__dirname, "../views/users/inicioSesion.ejs"));
}
};

module.exports = {
    usersController
};