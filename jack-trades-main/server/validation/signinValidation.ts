import Joi from 'joi';

const signinValidationSchema = ({
  email, password,
}) => {
  const schema = Joi.object({

    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
      'string.email': 'Invalid Email',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is required',
    }),
  });
  return schema.validateAsync({
    email, password,
  });
};
export default signinValidationSchema;
