import Joi from "joi";

export const createCatSchema = Joi.object({
    age: Joi.number().required(),
    name: Joi.string().max(5).optional(),
    breed: Joi.string().max(10).optional(),
}).options({ abortEarly: false, allowUnknown: true });;