/* eslint-disable @typescript-eslint/indent */
import Joi from 'joi';

const validateNewProduct = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().valid('donation', 'exchange').required(),
    gallery: Joi.array().items(Joi.string()),
    category_id: Joi.number().required(),
});

export default validateNewProduct;
