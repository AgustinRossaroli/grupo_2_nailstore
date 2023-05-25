const DB = require('../database/models');
const Op = DB.Sequelize.Op;

module.exports = {
    list: (req, res) =>
    DB.Users
        .findAll({
            attributes: ['name', 'email', 'id', 'image'] // Especificar las propiedades que deseas retornar
        })
        .then(users => {
            users = users.map((e) => {
                return {
                    ...e.dataValues,
                    id: e.id,
                    name: e.name,
                    email: e.email,
                    image: `http://localhost:3000/api/users/${e.id}/image`,
                    detail: `http://localhost:3000/api/users/${e.id}`,
                };
            });
            return res.json({
                totalUsers: users.length,
                users: users
            });
        }),
    userById: (req, res) => {
        const { id } = req.params;
        DB.Users.findByPk(id, {
            attributes: ["id", 'name', 'email', "image"] // Especificar las propiedades que deseas retornar
        })
        .then((user) => res.json(user))
        .catch((error) => console.log(error));
    },
}
