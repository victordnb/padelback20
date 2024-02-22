
const Liga = require('../models/liga');

exports.obtenerLigaPorNombre = (nombre) => {
  return Liga.findOne({ nombre: nombre });
};


exports.obtenerLigasPorUsername = (username) => {
    return Liga.find({ 'participantes.username': username });
  };

