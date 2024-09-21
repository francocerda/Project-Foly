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


//Obtenemos todos los usuarios con sus parametros
router.get('/', async (req,res) =>{

  try {
    const result = await pool.query('SELECT id, name, email FROM users');
    res.json(result.rows);
  } catch(error){
    console.error('Error al obtener los usuarios:', error.message); // Mostrar el error exacto en la consola
    res.status(500).json({error: 'Error al obtener los usuarios'}); // Mostrar el error exacto en la respuesta del json, postman
  }
});


//Actualizar un usuario
router.put('/:id', async (req, res) => {
  
    const {name , email} = req.body;
    const {id} = req.params;
  
  try{
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name,email,id] // mando consulta a postgres, y despues los placeholders se reemplazan por los param que les paso
    );

    if (result.row.length == 0){
      return res.status(404).json({error : 'Usuario no econtrado'}); // si lo buscamos y no esta devolvemos altiro 
    }
    res.json(result.rows[0]); // devolvemos el primero que obtuvimos
  } catch(error){
    console.error('Error al actualizar el usuario', error);// Consola
    res.status(500).json({error : 'Error el actualizar usuario'}) //Postman
  }
});


router.delete('/:id', async (req,res) => {

  const {id} = req.params;

  try{

    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *', [id]
    );
    if (result.row.lenght == 0){
      return res.status(404).json({error : 'Usuario no encontrado'})''
    }
    res.json({message: 'Usuario eliminado con exito'});
    
  } catch (error){
    console.error('Error al eliminar el usuario', error.message);
    res.status(500).json({error : 'Error al eliminar el usuario'});

  }




});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    // Comparar las contraseñas
    const isMatch = await bcrypt.compare(password, user.password); // booleano que revisa si son iguales
    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // aqui se puede implementar un token, le damos al usuario privilegios, ejemplo: guardar productos en el carro
    res.json({ message: 'Inicio de sesión exitoso' });

  } catch (err) {
    console.error('Error al iniciar sesión:', err.message);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}); 






module.exports = router;
