
const express = require('express');
const router = express.Router(); // Cuando llamemos a router, todas los rutas de productos se exportan al archivo de server.js
const pool = require('../config/db'); // conexion especial de postgresql que permite hacer consultas a la base de datos

// Obtener todos los productos
router.get('/', async (req, res) => { // cuando el usuario haga una solicitud get a la ruta /products, se ejecutara esta funcion. 
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows); // Devolvemos todos los productos
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Obtener un solo producto por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    const { name, description, price, stock } = req.body; // Desestructurar los datos del cuerpo
    try {
      const result = await pool.query(
        'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, stock]
      );
      res.status(201).json(result.rows[0]); // Retornar el producto creado
    } catch (err) {
      console.error(err.message); // Imprimir el error en la consola
      res.status(500).json({ error: 'Error al crear el producto' }); // Retornar un mensaje de error
    }
  });
  
  
// Actualizar un producto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    try {
      const result = await pool.query(
        'UPDATE products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *',
        [name, description, price, stock, id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(result.rows[0]); // Devolvemos el producto actualizado
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});
  
// Eliminar un producto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json({ message: 'Producto eliminado con éxito' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});
  


module.exports = router;
