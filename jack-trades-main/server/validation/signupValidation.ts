import Joi from 'joi';

const validateSighup = ({
  firstName, lastName, email, password, confirmPassword,
}) => {
  const schema = Joi.object({
    firstName: Joi.string().pattern(/^[a-zA-z]{2,20}$/).required().messages({
      'any.required': 'First name is required',
      'string.empty': 'First name is required',
      'string.pattern.base': 'First name must be 2-20 characters long, and contain only letters.',
    }),
    lastName: Joi.string().pattern(/^[a-zA-z]{2,20}$/).required().messages({
      'any.required': 'Last name is required',
      'string.empty': 'Last name is required',
      'string.pattern.base': 'Last name must be 2-20 characters long, and contain only letters.',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
      'string.email': 'Invalid Email',
    }),
    password: Joi.string().pattern(/^(?!.*[\s])(?=.*[0-9])(?=.*\W)[a-zA-Z0-9\W]{6,15}$/).required().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is required',
      'string.pattern.base': 'Password must be at least 6 characters, and contain letters, digits and special characters only.',
    }),
    confirmPassword: Joi.any().equal(Joi.ref('password')).required().label('Confirm password')
      .messages({
        'any.required': 'Confirm Password is required',
        'any.only': 'Passwords are\'nt matched',
      }),
  });
  return schema.validateAsync({
    firstName, lastName, email, password, confirmPassword,
  });
};

export default validateSighup;
