import Joi from 'joi';

const updateRequestValidation = Joi.object({
  receiverApproval: Joi.boolean().required(),
});

export default updateRequestValidation;
