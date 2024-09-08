const express = require('express');
const app = express();// Le decimos a Express que use las rutas de productos
const port = process.env.PORT || 3000;
const productRoutes = require('./routes/products'); // Importamos las rutas de productos
app.use('/products', productRoutes); 

app.get('/', (req, res) => {
  res.send('Welcome to the Fake Store API');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
