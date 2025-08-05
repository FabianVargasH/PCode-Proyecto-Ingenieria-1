const express = require ('espress');
const router = express.Router();

//Importo el model
const Evento = require('../models/Evento');

//GET para obtener todo los enventos
router.get('/', async (req,res)=>{
    try{
        const eventos = await Evento.find();
        res.json(eventos);
    }
    catch (error){
        res.status(500).json({mensaje: 'Error al obtener eventos'});
    }
});

//POST para crear un evento
router.post('/', async (req, res) => {
    const {titulo, fecha, hora, ubicacion, descripcion} = req.body;

    try{
        const nuevoEvento = new Evento ({titulo, fecha, hora, ubicacion, descripcion, estado: 'pendiente'});
        await nuevoEvento.save();
        res.status(201).json(nuevoEvento);
    }
    catch (error){
        res.status(400).json({mensaje: 'Error al crear el evento'});
    }
});

module.exports = router;