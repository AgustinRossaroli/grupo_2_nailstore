const path = require("path");

const iniciarSesion = (req,res) => {
    res.render(path.resolve(__dirname, "../views/users/inicioSesion.ejs"));
};

module.exports = {
    iniciarSesion
};