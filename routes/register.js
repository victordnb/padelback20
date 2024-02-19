const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Asegúrate de que la ruta al modelo User sea correcta
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    console.log('entra en post /register');
    try {
        
        // Validar los datos de entrada
        if (!req.body.email || !req.body.username || !req.body.password) {
            return res.status(400).json({ error: 'Por favor, proporciona un email, nombre de usuario y contraseña.' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ error: 'El nombre de usuario ya está en uso.' });
        }
        //en realidad el hash de codifica en el moddleware de user.js
        let hash = req.body.password;
        
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: hash
        });
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;