const path = require("path");
const products = require("../data/products1.json");

const mainController = {
    main: (req,res) => {
        const userSession = req.cookies.userSession;

        if (userSession) {
            res.render(path.resolve(__dirname, "../views/index.ejs"), {"allProducts": products});
        } else {
            res.redirect("/login");
        }
    },
    aboutUs: (req,res) => {
        res.render(path.resolve(__dirname, "../views/aboutUs.ejs"));
    }
};

module.exports = {
    mainController
}