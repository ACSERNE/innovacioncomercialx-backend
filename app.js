const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users.routes');
const productosRouter = require('./routes/productos.routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', usersRouter);
app.use('/api/productos', productosRouter);

module.exports = app;
