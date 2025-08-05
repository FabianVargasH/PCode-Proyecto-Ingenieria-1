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

// Rutas 
const registroRoutes = require('./routes/registro_routes');
app.use('/api/registro', registroRoutes);

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
