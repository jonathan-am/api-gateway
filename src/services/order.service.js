import httpStatus from 'http-status';
import { v4 } from 'uuid';
import client from '~/client/orderValidator.client';
import { getUniqueValue } from '~/client/redis.client';
import BadRequest from '~/middlewares/handler/Exceptions/BadRequest';

export const createOrder = async (data) => {
    await sendPaymentRequest(data);
    const response = await client.postOrder(data);
    validateResponse(response);
    return response.data;
}

export const requestOrderById = async (id) => {
    const response = await getUniqueValue(id);
    if(response==null) {
        throw new BadRequest(httpStatus.NOT_FOUND, "Order not Found");
    }
    return JSON.parse(response);
}

async function sendPaymentRequest(data) {
    //sendToExternalPaymentGateway
    const type = data.payment.type;
    data.payment = { type: type, identifier: `simula-payment-gateway-${v4()}`, status: 'received' };
}

function validateResponse(res) {
    if(!res || res.status != 201 || !res.data) throw new BadRequest(httpStatus.INTERNAL_SERVER_ERROR, "Error creating order")
}

export default {
    createOrder,
    requestOrderById
}