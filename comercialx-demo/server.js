const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let productos = [];
let caja = [];

app.post('/api/productos', (req, res) => {
  productos.push(req.body);
  res.status(201).json({ mensaje: 'Producto ingresado', producto: req.body });
});

app.post('/api/caja', (req, res) => {
  caja.push(req.body);
  res.status(201).json({ mensaje: 'Movimiento registrado', flujo: req.body });
});

app.get('/api/productos', (req, res) => res.json(productos));
app.get('/api/caja', (req, res) => res.json(caja));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
