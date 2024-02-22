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
      
      // Devolver el token al cliente junto con los datos del usuario.
      res.json({ token: token.toString(), user: userByName[0].username});
    } else {
      // Si la contraseña no es válida, devolver un error
      res.status(400).send('Email o contraseña incorrectos.');
    }
  } else {
    res.status(400).send('No existe el usuario por el nombre.');
  }
});

router.post('/users/:username', async (req, res) => {
  console.log('req.params.username:', req.params.username);
  console.log('req.body.token:', req.body.token);
  
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    user.token = req.body.token;
    await user.save();

    res.send({ message: 'Token saved successfully' });
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while saving the token' });
  }
});


module.exports = router;