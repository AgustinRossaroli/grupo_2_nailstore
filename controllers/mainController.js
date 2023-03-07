const path = require("path");
const productos = require("../data/products1.json");

const mainController = {
    main: (req,res) => {
        const producto = productos;
        const userSession = req.cookies.userSession;

        if (userSession) {
            res.render(path.resolve(__dirname, "../views/index.ejs"), {producto});
        } else {
            res.redirect("/iniciarSesion");
        }
    }
};

module.exports = {
    mainController
};