const DB = require('../database/models');
const Op = DB.Sequelize.Op;

module.exports = {
    list: (req, res) =>
    DB.Users
    .findAll()
    .then(Users => {
        return res.json(Users)
    })
}

