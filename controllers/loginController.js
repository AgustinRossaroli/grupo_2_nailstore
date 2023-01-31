const path = require("path");

const login = (req,res) => {
    res.render(path.resolve(__dirname, "../views/users/login.ejs"));
};

module.exports = {
    login
};