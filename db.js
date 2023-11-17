require('dotenv').config();
const mongoose = require('mongoose');

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${user}:${password}@mongopadel.0zx3rj8.mongodb.net/`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

module.exports = mongoose;