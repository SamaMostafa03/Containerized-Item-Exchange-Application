import Joi from 'joi';

const updateUserProfileValidation = Joi.object({
  email: Joi.string().email().required(),
  first_name: Joi.string().pattern(/^[a-zA-z]{2,20}$/).required().messages({
    'string.pattern.base': 'First name must be 2-20 characters long, and contain only letters.',
  }),
  last_name: Joi.string().pattern(/^[a-zA-z]{2,20}$/).required().messages({
    'string.pattern.base': 'Last name must be 2-20 characters long, and contain only letters.',
  }),
  bio: Joi.string().allow('').max(100),
  image: Joi.string().allow(null).pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpeg|jpg|gif|png)/i).messages({
    'string.pattern.base': 'Please add a valid URL and only these extensions [jpeg,jpg,git,png] are allowed',
  }),
});

export default updateUserProfileValidation;
