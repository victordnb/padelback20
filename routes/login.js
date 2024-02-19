const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/', async (req, res) => {
  const userByName = await User.find({ username: req.body.username });

  if (userByName && userByName.length > 0 && userByName[0].password) {

    let pasword = req.body.password.toString();
    let paswHash = userByName[0].password.toString();
    const validPassword = await bcrypt.compare(pasword, paswHash);

    const invalidPassword = await bcrypt.compare('contraseñaIncorrecta', userByName[0].password);
    console.log('invalidPassword:', invalidPassword);

    if (validPassword) {
      // Si la contraseña es válida, generar un token JWT
      const token = jwt.sign({ _id: userByName[0]._id }, 'secretKey');

      // Devolver el token al cliente
      res.send(token);
    } else {
      // Si la contraseña no es válida, devolver un error
      res.status(400).send('Email o contraseña incorrectos.');
    }
  } else {
    res.status(400).send('No existe el usuario por el nombre.');
  }
});

module.exports = router;