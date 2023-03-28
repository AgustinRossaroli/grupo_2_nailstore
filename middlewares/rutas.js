const path = require("path");

function auth (req, res, next) {
    if (req.session.email) {
        return next();
    } else {
        res.render(path.resolve(__dirname, "../views/loginError.ejs"));
    }
}

module.exports = auth;