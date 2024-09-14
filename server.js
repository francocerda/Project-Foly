<<<<<<< Updated upstream
const express = require('express');
const app = express();
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users'); // Importa las rutas de usuarios desde ./routes/userRoutes
=======
// Es el corzazon del servidor, inicializa els ervidor y gestiona las APIs
const express = require('express');// Express es un framework de node.js que nos permite crear servidores web de manera sencilla
const app = express(); // Inicializa una aplicación de Express, es como el centro de control que maneja las solicitudes
const productRoutes = require('./routes/products');// IMportamos los productos de la ruta escrita
>>>>>>> Stashed changes

app.use(express.json()); // Para que Express pueda manejar JSON en los cuerpos de las solicitudes
app.use(express.json()); // Le decimos a la aplicacion que vamos a usar JSON para enviar y recibir datos

<<<<<<< Updated upstream
app.use('/products', productRoutes); // Todas las rutas de productos estarán bajo "/products"
app.use('/users', userRoutes); 
=======
app.use('/products', productRoutes); // Cualquier solicitud que comience con /products será manejada por las rutas definida en la carpeta products.js 
>>>>>>> Stashed changes

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
  console.log('Servidor corriendo en http://localhost:3000');// Le digo al servidor que escuche en el puerto 3000
});
