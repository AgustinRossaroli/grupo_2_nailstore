const path = require("path");

const main = (req,res) => {
    res.sendFile(path.resolve(__dirname, "../views/index.html"));
};

module.exports = {
    main
};