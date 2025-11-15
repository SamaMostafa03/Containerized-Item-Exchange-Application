import * as yup from 'yup';

const validateProduct = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  type: yup.string().required('Choose a type'),
  gallery: yup.array().of(yup.string())
    .min(1, 'Choose at least one image')
    .required(),
  category_id: yup.number().required('Choose a category'),
});

export default validateProduct;
