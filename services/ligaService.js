
const Liga = require('../models/liga');

exports.obtenerLigaPorNombre = (nombre) => {
  return Liga.findOne({ nombre: nombre });
};


exports.obtenerLigasPorUsername = (username) => {
    return Liga.find({ 'participantes.username': username });
  };

  exports.editarPuntos = async (ligaNombre, username, points) => {
    const liga = await Liga.findOne({ nombre: ligaNombre });
    if (!liga) {
      throw new Error('Liga no encontrada');
    }
  
    const participante = liga.participantes.find(p => p.username === username);
    if (!participante) {
      throw new Error('Participante no encontrado');
    }
  
    participante.points = points;
  
    // Agrega un nuevo objeto al historial de ediciones
    liga.historialEdiciones.push({
      fecha: new Date(),
      username: username,
      points: points
    });
  
    await liga.save();
  
    return liga;
  };

