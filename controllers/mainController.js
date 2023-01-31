const path = require("path");

const main = (req,res) => {
    res.render(path.resolve(__dirname, "../views/index.ejs"));
};

module.exports = {
    main
};