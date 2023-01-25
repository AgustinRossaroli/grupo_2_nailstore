const path = require("path");

const iniciarSesion = (req,res) => {
    res.sendFile(path.resolve(__dirname, "../views/inicioSesion.html"));
};

module.exports = {
    iniciarSesion
};