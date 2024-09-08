const express = require('express');
const router = express.Router();  // Usamos el enrutador de Express

// Esta es una ruta GET para obtener todos los productos
router.get('/', (req, res) => {
  // Aquí puedes imaginar que traes los productos de una base de datos
  const products = [
    { id: 1, name: 'Producto 1', price: 100 },
    { id: 2, name: 'Producto 2', price: 200 },
    { id: 3, name: 'Producto 3', price: 300 }
  ];
  res.json(products); // Enviamos los productos en formato JSON
});

module.exports = router;  // Exportamos el router para usarlo en otras partes del proyecto
