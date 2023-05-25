const path = require("path");
const fs = require("fs");
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
const db = require("../database/models");
const { Op } = require('sequelize');


const usersController = {
    login: (req, res) => {
        res.render(path. resolve(__dirname, "../views/users/login.ejs"),{error: null});
    },
    loginUser: (req, res) => {
        let  errors = validationResult(req);
        const { contrasena, email } = req.body;

        db.Users.findOne({
            where: {
                email: email,
            }})
            .then((data) => {
                let comparacion =  bcrypt.compareSync(contrasena, data.password)

                if (comparacion) {
                    req.session.email = email;
                    res.redirect('/home')
                } else {
                    res.send("credenciales incorrectas")
                }
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
        let image = req.file ? req.file.filename : "productIMG.jpg";

          const newUsers= {
            name : req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.contrasena,10),
            birthdate: req.body.born,
            image: image,
          }
          
          db.Users.create(newUsers)
            .then((newUser) => {
                res.redirect("/home")
            })
            .catch((error) => res.send(error))
    },
    resetPassword: (req, res) => {
        res.render(path.resolve(__dirname, "../views/users/resetPassword.ejs"))
    },
    editUser: (req, res) => {
        const { id } = req.params;
        
        db.Users.findByPk(id)
            .then(user => {
                res.render(path.resolve(__dirname, "../views/users/userDetail.ejs"), {
                    "user": user,
                    "referer": req.headers.referer
                })
            })
    },
    postEditUser: (req, res) => {
        const { nombre, email, fecha, contrasena, id } = req.body;
    
        let image = req.file ? req.file.filename : null; 
    
        if (contrasena.length > 0) {
            db.Users.findByPk(id)
                .then((usuario) => {
                    if (!image) {
                        image = usuario.image;
                    }
    
                    return usuario.update({
                        name: nombre,
                        email: email,
                        birthdate: fecha,
                        password: bcrypt.hashSync(contrasena, 10),
                        image: image
                    });
                })
                .then((data) => {
                    res.redirect("/home" + id);
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({ message: `Error al editar el usuario: ${error.message}` });
                });
        } else {
            db.Users.findByPk(id)
                .then((usuario) => {
                    if (!image) {
                        image = usuario.image;
                    }
    
                    return usuario.update({
                        name: nombre,
                        email: email,
                        birthdate: fecha,
                        image: image
                    });
                })
                .then((data) => {
                    res.redirect("/home");
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({ message: `Error al editar el usuario: ${error.message}` });
                });
        }
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

    delete: (req, res) => {
      const { id } = req.params;
    
      db.Carts.findAll({ where: { user_id: id } })
        .then(carts => {
          const cartIds = carts.map(cart => cart.id);
    
          return db.Cart_products.destroy({
            where: { cart_id: { [Op.in]: cartIds } }
          }).then(() => db.Carts.destroy({ where: { user_id: id } }));
        })
        .then(() => db.Users.destroy({ where: { id } }))
        .then(() => {
          res.redirect("/home");
        })
        .catch((error) => {
          res.send("Error al eliminar registro: " + error);
        });
    }

}

 module.exports = usersController