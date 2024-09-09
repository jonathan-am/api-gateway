import app from './app.js';
import { initRedis } from './client/redis.client.js';
import { createClient } from "redis";
import logger from './config/logger.js';

const start = async () => {
    try {
        logger.info('Iniciando conexao com o redis!')
        const redis = createClient({url: 'redis://127.0.0.1:6379'});
        await redis.connect();
        initRedis(redis);
        logger.info('Successo ao se conectar com o redis!')
    }catch(error) {
        logger.error('Erro ao conectar com redis | message:', error)
    }
}

start();

app.listen(3000, ()=> logger.info('Servidor iniciado na porta 3000'))