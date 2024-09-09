import logger from '~/config/logger';
import { createOrder, requestOrderById } from '~/services/order.service';

export const createOrderRequest = async (req, res) => {
    try {
        const response = await createOrder(req.body);
        res.json(response);
    }catch(error) {
        logger.error('OrderController.createOrderRequest - Erro na criacao do pedido | message:',error || error.message)
        throw error;
    }
}

export const getOrderById = async (req, res) => {
    try {
        const response = await requestOrderById(req.params.orderId);
        res.json(response);
    }catch(error) {
        logger.error('OrderController.getOrderById - Erro ao retornar orderById | message:', error || error.message)
        throw error;
    }
}

export default {
    createOrderRequest,
    getOrderById
}
