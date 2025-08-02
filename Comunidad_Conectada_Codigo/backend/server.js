// Cargar variables de entorno
require('dotenv').config();

// Importaciones
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Puerto
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // para interpretar JSON

// Rutas (ejemplo)
const anunciosRoutes = require('./routes/anuncios'); // si hubiese una ruta ya 
app.use('/api/anuncios', anunciosRoutes);

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((err) => console.error(' Error al conectar a MongoDB:', err));

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
