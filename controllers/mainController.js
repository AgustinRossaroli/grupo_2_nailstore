const path = require("path");
const products = require("../data/products1.json");
const users = require("../data/users.json");
const fs = require("fs")

const mainController = {
    filename: path.join(__dirname, "../data/users.json"),

    getAllUsers: () => {
        return JSON.parse(fs.readFileSync(mainController.filename, "utf-8"));
    },
    main: (req,res) => {
        const email = req.session.email;

        const user = mainController.getAllUsers().find((i) => i.email == email);
        
        res.render(path.resolve(__dirname, "../views/index.ejs"), {
        "allProducts": products,
        "user": user
    });
    },
    aboutUs: (req,res) => {
        res.render(path.resolve(__dirname, "../views/aboutUs.ejs"));
    }
};

module.exports = {
    mainController
}