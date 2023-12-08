const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Asegúrate de que la ruta al modelo User sea correcta
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    console.log('entra en post /register');
    try {
        console.log(' llega y este es el body: ', req.body);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword
      });
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;