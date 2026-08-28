import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas básicas (placeholder)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando correctamente' });
});

export function startServer(port) {
  return app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}
