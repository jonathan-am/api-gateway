import { Router } from 'express';
import validate from '~/middlewares/validate';
import { validateSchemaCreateOrder, validateSchemaGetOrderById } from '~/validators/data.validation';
import resolve from '~/utils/ResolveRequest';
import {createOrderRequest, getOrderById} from '~/controller/order.controller';
import authenticate from '~/middlewares/authenticate';

const router = Router();

router.post('/', authenticate, validate(validateSchemaCreateOrder),  resolve(createOrderRequest));
router.get('/:orderId', authenticate, validate(validateSchemaGetOrderById),  resolve(getOrderById));

export default router;