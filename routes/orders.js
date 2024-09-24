const express = require('express');
const router = express.Router(); // Cuando llamemos a router, todas las rutas de pedidos se exportan al archivo de server.js
const pool = require('../config/db'); // Conexión especial de PostgreSQL

// Crear un nuevo pedido (POST /orders)
router.post('/', async (req, res) => {
  const { user_id, items } = req.body; // 'items' es un array de { product_id, quantity }

  try {
    // Crear el pedido en la tabla "orders"
    const orderResult = await pool.query(
      'INSERT INTO orders (user_id) VALUES ($1) RETURNING *',
      [user_id]
    );
    const orderId = orderResult.rows[0].id;

    // Insertar los productos en la tabla "order_items"
    for (let item of items) {
      const productResult = await pool.query('SELECT price FROM products WHERE id = $1', [item.product_id]);
      const price = productResult.rows[0].price;

      await pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.product_id, item.quantity, price]
      );
    }

    res.status(201).json({ message: 'Pedido creado con éxito', orderId });
  } catch (err) {
    console.error('Error al crear el pedido:', err.message); // Mostrar el mensaje de error en la consola
    res.status(500).json({ error: `Error al crear el pedido: ${err.message}` }); // Enviar el error detallado al cliente
  }
});

// Obtener todas las órdenes (GET /orders)
router.get('/', async (req, res) => {
  try {
    // Consulta para obtener todas las órdenes
    const ordersResult = await pool.query('SELECT * FROM orders');
    
    // Si no hay órdenes, devolver un mensaje apropiado
    if (ordersResult.rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron órdenes' });
    }

    // Obtener los productos asociados a cada pedido
    const ordersWithItems = [];

    for (let order of ordersResult.rows) {
      const itemsResult = await pool.query(
        'SELECT p.name, oi.quantity, oi.price FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = $1',
        [order.id]
      );
      
      ordersWithItems.push({
        order: order,
        items: itemsResult.rows
      });
    }

    res.status(200).json(ordersWithItems); // Devolver todas las órdenes con los productos
  } catch (err) {
    console.error('Error al obtener las órdenes:', err.message);
    res.status(500).json({ error: 'Error al obtener las órdenes' });
  }
});


// Obtener los detalles de un pedido (GET /orders/:id)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Obtener el pedido
    const orderResult = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    // Obtener los productos asociados al pedido
    const itemsResult = await pool.query(
      'SELECT p.name, oi.quantity, oi.price FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = $1',
      [id]
    );

    const order = orderResult.rows[0];
    const items = itemsResult.rows;

    res.status(200).json({ order, items });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al obtener el pedido' });
  }
});

// Actualizar un pedido (PUT /orders/:id)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { items } = req.body; // 'items' es un array de { product_id, quantity }

  try {
    // Actualizar las cantidades de los productos en el pedido
    for (let item of items) {
      await pool.query(
        'UPDATE order_items SET quantity = $1 WHERE order_id = $2 AND product_id = $3',
        [item.quantity, id, item.product_id]
      );
    }

    res.status(200).json({ message: 'Pedido actualizado con éxito' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al actualizar el pedido' });
  }
});

// Eliminar un pedido (DELETE /orders/:id)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM orders WHERE id = $1', [id]);
    res.status(200).json({ message: 'Pedido eliminado con éxito' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al eliminar el pedido' });
  }
});

module.exports = router;
