const express = require('express');
const router = express.Router();
const Player = require('../models/player');

router.post('/', (req, res) => {
  const newPlayer = new Player({
    array1: req.body.array1,
    array2: req.body.array2
  });

  newPlayer.save()
    .then(() => res.json({ message: 'Datos recibidos y guardados en la base de datos' }))
    .catch(err => res.status(500).json({ message: 'Error al guardar en la base de datos' }));
});

router.get('/', (req, res) => {
  Player.find()
    .then(players => res.json(players))
    .catch(err => res.status(500).json({ message: 'Error al obtener los jugadores de la base de datos' }));
});

router.get('/datesWithData', (req, res) => {
  // Buscar todas las fechas únicas en la colección de jugadores
  Player.distinct('createdAt')
    .then(dates => {
      console.log(dates);
      res.json(dates);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error al obtener las fechas de la base de datos' });
    });
});

router.get('/matches', (req, res) => {
  const date = req.query.date;
  if (!date) {
    return res.status(400).json({ message: 'No date query parameter provided' });
  }

  // Convertir la fecha a un objeto Date
  const dateObj = new Date(date);

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  
  // Buscar jugadores que coincidan con la fecha
  Player.find({ createdAt: { $gte: start, $lte: end } })
    .then(players => {
      console.log(players);
      res.json(players);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error al obtener los jugadores de la base de datos' });
    });
});

module.exports = router;