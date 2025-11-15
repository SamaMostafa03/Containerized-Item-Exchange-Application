import Joi from 'joi';

const validateUpdateData = Joi.object({
  id: Joi.number().min(1).required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export default validateUpdateData;
