import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, nombre: 'Usuario Demo' }]);
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Backend escuchando en puerto ${PORT}`));
