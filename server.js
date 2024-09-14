const express = require('express');
const app = express();
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users'); // Importa las rutas de usuarios desde ./routes/userRoutes

app.use(express.json()); // Para que Express pueda manejar JSON en los cuerpos de las solicitudes

app.use('/products', productRoutes); // Todas las rutas de productos estarán bajo "/products"
app.use('/users', userRoutes); 

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
