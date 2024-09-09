import { beforeAll, describe, it, vi } from 'vitest';
const request = require('supertest');
import app from '../../src/app';
import { initRedis } from '../../src/client/redis.client';

const orderRequest = await import('../resources/OrderRequest.json', {with: {type: 'json'}});
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZWVwVmFsaWQiOnRydWUsImlhdCI6MTcyNTkyMzM2MiwiZXhwIjoxNzI2MjgzMzYyfQ.4_rHN_oUz-OgptDoKLHQFWKcgQUrc_Pc-pikMEaunLo";

beforeAll(()=> {
    initRedis({
        get: ()=> (JSON.stringify(orderRequest.default)),
        del: ()=> ("teste"),
        set: ()=> ("teste"),
        hGetAll: ()=> (["teste"])
    })

    vi.mock('jsonwebtoken', ()=> ({
        default: {
            sign: vi.fn(()=>(token)),
            verify: vi.fn(()=>({ keepValid: true }))
        }
    }))

    vi.mock('axios', ()=> ({
        default: vi.fn(()=>new Promise((resolve, reject)=>resolve({status:201, data: {success:true}})))
    }))
})

describe('Testes da api', ()=> {
    describe('order', ()=> {
        it('case success api - POST order', ()=> {
            return request(app)
                    .post('/v1/order')
                    .set('token', token)
                    .send(orderRequest.default)
                    .expect(200, {success: true})
        })
        it('case success api - GET orderById', ()=> {
            return request(app)
                    .get('/v1/order/231')
                    .set('token', token)
                    .expect(200, orderRequest.default)
        })
        it('case success api - POST auth login', ()=> {
            return request(app)
                    .post('/v1/login')
                    .send({login: "admin", password: "admin"})
                    .expect(200, {token:token})
        })
    })
})