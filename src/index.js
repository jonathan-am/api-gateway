import app from './app.js';
import logger from './config/logger.js';
import { startRedis } from './config/redis.config.js';

startRedis();

app.listen(3000, ()=> logger.info('Servidor iniciado na porta 3000'))