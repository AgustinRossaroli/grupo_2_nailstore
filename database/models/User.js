const { Model } = require("sequelize");
const Product = require("./Product");

module.exports = (sequelize, dataTypes) => {
    let User = sequelize.define("Users",{
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        birthdate: {
            type: dataTypes.DATEONLY
        },
        image: {
            type: dataTypes.STRING
        },
        admin: {
            type: dataTypes.BOOLEAN
        }
    },{
        tableName: "users",
        timestamps: false
    })
 
       return User;
    }