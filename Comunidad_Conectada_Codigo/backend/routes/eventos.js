const express = require('express');
const router = express.Router();

// Importar el modelo
const Evento = require('../models/Evento');

// GET para obtener todos los eventos
router.get('/', async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener eventos' });
  }
});

// POST para crear un evento
router.post('/', async (req, res) => {
  console.log('Body recibido:', req.body);

  // Validación: asegurarse que req.body exista
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ mensaje: 'No se recibió un cuerpo válido en la solicitud' });
  }

  // Desestructurar datos, sirve para sacar todos los datos del evento de una sola vez, lo hice asi porque no me servia el post al server sacando uno por uno
  const { titulo, fecha, hora, ubicacion, descripcion } = req.body;

  try {
    const nuevoEvento = new Evento({
      titulo,
      fecha,
      hora,
      ubicacion,
      descripcion,
      estado: 'pendiente' // valor por defecto
    });

    await nuevoEvento.save();
    res.status(201).json(nuevoEvento);
  } catch (error) {
    console.error('Error al crear evento:', error);
    res.status(400).json({ mensaje: 'Error al crear el evento' });
  }
});

module.exports = router;
