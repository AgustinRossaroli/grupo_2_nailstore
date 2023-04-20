const path = require("path");
const fs = require("fs");
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
const db = require('../database/models');
const { log } = require("console");




const usersController = {
    filename: path.join(__dirname, "../data/users.json"),

    getAllUsers: () => {
        return JSON.parse(fs.readFileSync(usersController.filename, "utf-8"))
    },

    login: (req, res) => {
        res.render(path. resolve(__dirname, "../views/users/login.ejs"),{error: null});
    },
    loginUser: (req, res) => {
        let  errors = validationResult(req);
        const { password, email } = req.body;
      db.Users.findOne({
        where: {
            email: email,
            password: bcrypt.compareSync(password, password)
        }})
        .then(() => {
            req.session.email = email;
            res.redirect('/home')
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: error.message})
        })
      
    },
    signUp: (req, res) => {
        res.render(path.resolve(__dirname, "../views/users/signUp.ejs"));

       
    },
    signUpUser: (req, res) => {
        const { name, email, password, born } = req.body;

        const user = usersController.getAllUsers();

        const newId = (user) => {
            if (user.length) {
                return user[user.length - 1].id + 1;
            } else {
                return 1;
            }
           
        
        };

        let image = req.file ? req.file.filename : "fotoUser.jpg";

        const obj = {
            id: newId(user),
            name: name,
            email: email,
            password: bcrypt.hashSync(password, 10),
            born: born,
            image: image
        };
      
        user.push(obj);

        fs.writeFileSync(usersController.filename, JSON.stringify(user, null, " "));

        res.redirect("/home");
    },
    userDetail: (req, res) => {
        const { id } = req.params;
        const allUsers = usersController.getAllUsers();

        const user = allUsers.find((i) => i.id == id);

        res.render(path.resolve(__dirname, "../views/users/userDetail.ejs"), {
            "user": user,
            "referer": req.headers.referer
        })
        
    },
    logout: (req, res) => {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/home');
            }
        });
    },

      createUser: (req, res) => {
        let image = req.file ? req.file.filename : "productIMG.jpg";
          const newUsers= {
            name : req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10),
            birthdate: req.body.born,
            image: image,
          }
          
          db.User.create(newUsers)
          .then((newUser) =>{return res.redirect('/login')})
          .catch((error) => res.send(error))
        },
     updateUser: (req, res) => {
      let editUser ={
        name : req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,10),
        birthdate: req.body.born,
        image: image,
       }
       db.User.update(editUser),{where: { id: req.params.id} }
       .then(() =>{ res.redirect('/home')})
       .catch((error) => res.send(error))
     },
      delete: function(req, res) {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect("/home");
      }
}

 module.exports = usersController
    