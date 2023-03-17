const path = require("path");
const fs = require("fs");
const bcrypt = require('bcrypt');

const usersController = {
    filename: path.join(__dirname, "../data/users.json"),

    getAllUsers: () => {
        return JSON.parse(fs.readFileSync(usersController.filename, "utf-8"))
    },

    login: (req, res) => {
        res.render(path.resolve(__dirname, "../views/users/login.ejs"));
    },
    loginUser: (req, res) => {
        const { password, email } = req.body;
        const users = usersController.getAllUsers();

        const user = users.find(
            (i) => i.email === email && bcrypt.compareSync(password, i.password)
        );

        if (user) {
            req.session.email = email;
            res.redirect("/home");
        } else {
            res.send("Credenciales incorrectas.");
        }
    },
    signUp: (req, res) => {
        res.render(path.resolve(__dirname, "../views/users/signUp.ejs"));
    },
    signUpUser: (req, res) => {
        const { name, email, password, date, image } = req.body;

        const user = usersController.getAllUsers();

        const newId = (user) => {
            if (user.length) {
                return user[user.length - 1].id + 1;
            } else {
                return 1;
            }
        };

        const obj = {
            id: newId(user),
            name: name,
            email: email,
            password: bcrypt.hashSync(password, 10),
            born: date,
            image: image
        };

        user.push(obj);

        fs.writeFileSync(usersController.filename, JSON.stringify(user, null, " "));

        res.send("Usuario Creado");
    },
    userDetail: (req,res) => {
        const {id} = req.params;
        const allUsers = usersController.getAllUsers();

        const user = allUsers.find((i) => i.id == id);
        
        res.render(path.resolve(__dirname, "../views/users/userDetail.ejs"), {user})
    }
};

module.exports = {
    usersController,
};