import { Router } from 'express';
import validate from '~/middlewares/validate';
import resolve from '~/utils/ResolveRequest';
import { validateSchemaSigin } from '~/validators/data.validation';
import { sigin } from '~/controller/auth.controller';

const router = Router();

router.post('/', validate(validateSchemaSigin),  resolve(sigin));

export default router;