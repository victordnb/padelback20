// En tu controlador (por ejemplo, ligaController.js)

const Liga = require('../models/liga'); // Asegúrate de tener un modelo 'Liga'

exports.guardarLiga = (req, res) => {
  const liga = new Liga({
    nombre: req.body.nombre,
    participantes: req.body.participantes
  });

  liga.save()
    .then(result => {
      res.status(201).json({
        message: 'Liga guardada con éxito',
        result: result
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error al guardar la liga',
        error: error
      });
    });
};