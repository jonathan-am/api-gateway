import httpStatus from "http-status";
import { getUniqueValue } from "~/client/redis.client"
import jwt from 'jsonwebtoken';
import logger from "~/config/logger";
import InvalidAuthToken from "./handler/Exceptions/InvalidAuthToken";

const validate = async (req, resolve, reject) => {
    try {
        const token = req.headers.token;
        const securityKey = await getUniqueValue(token);
        const decrypted = jwt.verify(token, securityKey);
        if(!decrypted.keepValid) {
             reject(new InvalidAuthToken(httpStatus.UNAUTHORIZED, "Not Authenticated."))
        }
    }catch(error) {
        logger.error('Error decrypting token, ', error);
         reject(new InvalidAuthToken(httpStatus.UNAUTHORIZED, "Not Authenticated."))
    }
    return resolve();
}

export default async (req, res, next) => {
    return new Promise((resolve, reject)=> validate(req, resolve, reject)).then(()=> next()).catch((err)=>next(err))
}