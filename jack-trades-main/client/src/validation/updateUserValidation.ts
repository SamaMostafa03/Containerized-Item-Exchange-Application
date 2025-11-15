import * as yup from 'yup';

const updateUserValidation = yup.object().shape({
  first_name: yup.string().matches(
    /^[a-zA-z]{2,20}$/,
    'Please add a valid name',
  ).required(),
  last_name: yup.string().matches(
    /^[a-zA-z]{2,20}$/,
    'Please add a valid name',
  ).required(),
  email: yup.string().email().required(),

  bio: yup.string().label(' ').max(100),
  image: yup.string(),
});
export default updateUserValidation;
