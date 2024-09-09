import Joi from 'joi';

export const validateSchemaCreateOrder = {
    body: Joi.object().keys({
        payment: Joi.object({
            type: Joi.string().trim(false).required(),
            data: Joi.alternatives().conditional( 'type', [{ is: 'card', then: Joi.object({
                number: Joi.string().regex(new RegExp(`^[0-9]+$`)).length(16).required(),
                digit: Joi.string().regex(new RegExp(`^[0-9]+$`)).min(3).max(4).required(),
                holder: Joi.string().trim().required(),
                validity: Joi.string().trim(false).required(),
                document: Joi.string().regex(new RegExp(`^[0-9]+$`)).length(11).required(),
            })}, { is: 'pix', then: Joi.object({
                holder: Joi.string().trim().required(),
                document: Joi.string().regex(new RegExp(`^[0-9]+$`)).length(11).required(),
                value: Joi.number().integer().required()
            })}, {is: 'invoice', then: Joi.object({
                document: Joi.string().regex(new RegExp(`^[0-9]+$`)).length(11).required(),
                receivedDate: Joi.date().required()
            })}]).required()
        }),
        item: Joi.object({
            name: Joi.string().trim().required(),
            quantity: Joi.number().integer().required(),
            unitPrice: Joi.number().required(),
        }),
        value: Joi.number().required(),
        billing: Joi.object({
            name: Joi.string().trim(false).required(),
            lastname: Joi.string().trim(false).required(),
            address: Joi.string().trim().required()
        })
    }),
    headers: Joi.object().keys({
        token: Joi.string().required(),
    }).options({allowUnknown:true})
}

export const validateSchemaGetOrderById = {
    params: Joi.object().keys({
        orderId: Joi.number().required()
    }),
    headers: Joi.object().keys({
        token: Joi.string().required(),
    }).options({allowUnknown:true})
}

export const validateSchemaSigin = {
    body: Joi.object().keys({
        login: Joi.string().required(),
        password: Joi.string().required()
    }),
}

export default {
    validateSchemaCreateOrder,
    validateSchemaGetOrderById,
    validateSchemaSigin
}