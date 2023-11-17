const express = require('express');
const cors = require('cors');
const playersRouter = require('./routes/players');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/players', playersRouter);

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