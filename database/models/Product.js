module.exports = (sequelize, dataTypes) => {
    const Product = sequelize.define("Product", {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.TEXT
        },
        image: {
            type: dataTypes.STRING
        },
        category: {
            type: dataTypes.TEXT
        },
        price: {
            type: dataTypes.DECIMAL
        }
    },{
        tableName: "products",
        timestamps: false
    })

    return Product
    
}