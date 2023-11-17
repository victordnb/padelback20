const mongoose = require('../db');

const playerSchema = new mongoose.Schema({
  array1: [String],
  array2: [String],
  createdAt: { type: Date, default: Date.now }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;