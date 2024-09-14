const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Importa la conexión a PostgreSQL desde db.js
const bcrypt = require('bcrypt'); // Sirve para encriptar


// Crear un nuevo usuario
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar si el email ya está registrado
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Encriptar la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar el nuevo usuario en la base de datos
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );

    // Devolver el nuevo usuario creado sin la contraseña
    const newUser = result.rows[0];
    delete newUser.password; // Eliminamos la contraseña antes de devolverla
    res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });
  } catch (err) {
    console.error('Error al crear el usuario:', err.message); // Mostrar el error exacto en la consola
    res.status(500).json({ error: `Error al crear el usuario: ${err.message}` }); // Mostrar el error exacto en la respuesta
  }
});


module.exports = router;
