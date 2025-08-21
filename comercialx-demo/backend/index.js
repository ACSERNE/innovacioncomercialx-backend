import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(compression());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Backend ComercialX funcionando');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
