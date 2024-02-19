const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


router.post('/', async (req, res) => {
/*  // Buscar al usuario en la base de datos
  const userByName = await User.findOne({ username: req.body.username });

  // Si el usuario no existe, devolver un error
  if (!userByName) return res.status(400).send('No existe el usuario por el nombre.');

 
  const user = await User.findOne({ email: userByName.email });

  // Si el usuario no existe, devolver un error
  if (!user) return res.status(400).send('No existe el usuario por el email.');

  // Si el usuario existe, verificar la contraseña
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  // Si la contraseña no es válida, devolver un error
  if (!validPassword) return res.status(400).send('Email o contraseña incorrectos.');

  // Si la contraseña es válida, generar un token JWT
  const token = jwt.sign({ _id: user._id }, 'secretKey');

  // Devolver el token al cliente
  res.send(token); */
  const userByName = await User.find({ username: req.body.username });

  console.log( 'username: ', req.body.username);

  console.log('userByName:', userByName); // Debería imprimir: userByName: { _id: 5f2e6a7a6f3b9a3f2a1e6b4a, email: 'email@ejemplo', username: 'usuarioEjemplo', password: '$2b$10$MnQ9F1M5R0YXQDQ2j9J3bO9sZ5vJZ7YQD2Lb3J7QxYQzZ2Y9B3r6G', createdAt: 2020-08-08T12:53:14.000Z }
  console.log('req.body.psaw: ', req.body.password); // Debería imprimir: contraseñaEjemplo
  
  if (userByName && userByName.length > 0 && userByName[0].password) {
    const validPassword = await bcrypt.compare(req.body.password, userByName[0].password);
    console.log('validPassword:', validPassword); // Debería imprimir: validPassword: true
  
    const invalidPassword = await bcrypt.compare('contraseñaIncorrecta', userByName[0].password);
    console.log('invalidPassword:', invalidPassword); // Debería imprimir: invalidPassword: false
  } else {
    console.log('No user found with that username or user has no password');
  }
  
  const invalidPassword = await bcrypt.compare('contraseñaIncorrecta', hashedPassword);
  console.log('invalidPassword:', invalidPassword); // Debería imprimir: invalidPassword: false
}); 

module.exports = router;