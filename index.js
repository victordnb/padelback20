const express = require('express');
const cors = require('cors');
const playersRouter = require('./routes/players');
const registerRouter = require('./routes/register');
const app = express();
const port = process.env.PORT || 3000;
const loginRouter = require('./routes/login');

app.use(cors());
app.use(express.json());
app.use('/api/players', playersRouter);
app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// para vercel:

// const express = require('express');
// const cors = require('cors');
// const playersRouter = require('./routes/players');
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use('/api/players', playersRouter);

// module.exports = app;