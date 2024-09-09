import logger from "~/config/logger";
import { performLogin } from "~/services/auth.service";

export const sigin = async (req, res) => {
    try {
        const response = await performLogin(req.body);
        res.json(response);
    }catch(error) {
        logger.error('AuthController.singin - Erro ao tentar logar | message:', error || error.message)
        throw error;
    }
}

export default {
    sigin
}