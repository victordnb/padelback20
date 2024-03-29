// En tu modelo (por ejemplo, liga.js)

const mongoose = require('mongoose');

const ligaSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  participantes: [
    {
      username: { type: String, required: true },
      points: { type: Number, default: 0 }
    }
  ],
  historialEdiciones: [
    {
      fecha: { type: Date, default: Date.now },
      username: String,
      points: Number
    }
  ]
});

module.exports = mongoose.model('Liga', ligaSchema);