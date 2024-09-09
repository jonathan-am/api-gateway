import RedisClient from "~/client/redis.client";
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import BadRequest from "~/middlewares/handler/Exceptions/BadRequest";
import httpStatus from "http-status";

export const performLogin = async (data)=> {
    const { login , password } = data;
    if(login==="admin" && password==="admin") {
        const phrase = v4();
        const token = jwt.sign({ keepValid: true }, phrase, { expiresIn: '100h'})
        await RedisClient.insertValue(token, phrase);
        return {token: token};
    }
    throw new BadRequest(httpStatus.UNAUTHORIZED, 'Invalid login or password.');
}

export default {
    performLogin
}