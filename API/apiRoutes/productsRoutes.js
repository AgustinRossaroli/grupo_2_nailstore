const express = require("express");
const router = express.Router();
const { productsController } = require("../apiControllers/productsControllers");
const db = require("../database/models");
const fs = require('fs');
const path = require('path');

router.get("/products", productsController.allProducts);
router.get("/products/:id", productsController.productById);
router.get('/products/:id/image', (req, res) => {
    const userId = req.params.id;
  
    // Aquí debes implementar la lógica para obtener la imagen del usuario con el ID proporcionado
    db.Products.findByPk(userId)
      .then(user => {
          console.log(user.image)
        if (user && user.image) {
            const imagePath = path.join(__dirname, '../../public/images', user.image);
  
          // Verificar si el archivo de imagen existe
          if (fs.existsSync(imagePath)) {
            // Enviar la imagen al cliente
            res.sendFile(imagePath);
          } else {
            // Si la imagen no existe, puedes enviar una imagen predeterminada o una respuesta de error
            res.status(404).send('Imagen no encontrada');
          }
        } else {
          res.status(404).send('Usuario no encontrado');
        }
      })
      .catch(error => {
        console.error('Error al obtener la imagen del usuario:', error);
        res.status(500).send('Error interno del servidor');
      });
  });

module.exports = router;
