const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.send('Anuncio creado');
});

module.exports = router;
