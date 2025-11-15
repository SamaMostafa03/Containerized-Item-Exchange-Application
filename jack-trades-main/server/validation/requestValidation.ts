import Joi from 'joi';

const validateCheckRequest = Joi.object({
  senderId: Joi.number().required(),
  productId: Joi.number().required(),
});

export default validateCheckRequest;
