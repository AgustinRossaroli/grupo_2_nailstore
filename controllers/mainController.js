const path = require("path");
const products = require("../data/products1.json");

const mainController = {
    main: (req, res) => {
        if (req.session.email) {
            res.render(path.resolve(__dirname, "../views/index.ejs"), { "allProducts": products });
        } else {
            res.redirect("/login");
        }
    }
};

module.exports = {
    mainController
}