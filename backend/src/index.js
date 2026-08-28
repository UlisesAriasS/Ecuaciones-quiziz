import { startServer } from './infrastructure/server.js';

const PORT = process.env.PORT || 3000;

function bootstrap() {
  console.log('Iniciando aplicación...');
  startServer(PORT);
}

bootstrap();
