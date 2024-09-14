const express = require('express');
const app = express();
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users'); // Importa las rutas de usuarios desde ./routes/userRoutes

app.use(express.json()); // Le decimos a la aplicacion que vamos a usar JSON para enviar y recibir datos

app.use('/products', productRoutes); // Todas las rutas de productos estarán bajo "/products"
app.use('/users', userRoutes); 

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');// Le digo al servidor que escuche en el puerto 3000
});
