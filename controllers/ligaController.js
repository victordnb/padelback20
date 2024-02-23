// En tu controlador (por ejemplo, ligaController.js)
const ligaService = require('../services/ligaService');
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



exports.obtenerLiga = (req, res) => {
  ligaService.obtenerLigaPorNombre(req.params.nombre)
    .then(liga => {
      if (liga) {
        res.status(200).json(liga);
      } else {
        res.status(404).json({ message: 'Liga no encontrada' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error al obtener la liga',
        error: error
      });
    });
};

exports.obtenerLigasPorUsername = (req, res) => {
  console.log('req.params.username', req.params.username);
  ligaService.obtenerLigasPorUsername(req.params.username)
    .then(ligas => {
      if (ligas && ligas.length > 0) {
        res.status(200).json(ligas);
      } else {
        res.status(404).json({ message: 'No se encontraron ligas para este usuario' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Error al obtener las ligas',
        error: error
      });
    });
};

exports.editarPuntos = async (req, res) => {
  try {
    const { nombre } = req.params;
    const { username, points } = req.body;
    const liga = await ligaService.editarPuntos(nombre, username, points);
    res.json(liga);
  } catch (error) {
    console.error(error); // Agrega esta línea para imprimir el error en la consola del servidor
    res.status(500).json({ message: error.message });
  }
};