import { FC } from 'react';
import {
  Radio, RadioGroup, FormControlLabel,
  FormControl, FormLabel, FormHelperText,
} from '@mui/material';

import { ICategoryProps } from '../../interfaces';

const CategoryRadio:FC<ICategoryProps> = ({ formik }) => (
  <FormControl
    className="category"
    error={formik.touched.category_id && !!formik.errors.category_id}
  >
    <FormLabel id="demo-row-radio-buttons-group-label">Category</FormLabel>
    <RadioGroup
      row
      aria-labelledby="demo-row-radio-buttons-group-label"
      name="category_id"
      onChange={formik.handleChange}
      value={formik.values.category_id}
    >
      <FormControlLabel
        value="1"
        control={<Radio id="1" />}
        label="Clothes"
      />
      <FormControlLabel
        value="2"
        control={<Radio id="2" />}
        label="Furniture"
      />
      <FormControlLabel
        value="3"
        control={<Radio id="3" />}
        label="Books"
      />
      <FormControlLabel
        value="4"
        control={<Radio id="4" />}
        label="Accessories"
      />
      <FormControlLabel
        value="5"
        control={<Radio id="5" />}
        label="Electronics"
      />
      <FormControlLabel
        value="6"
        control={<Radio id="6" />}
        label="Other"
      />
    </RadioGroup>
    {formik.touched.category_id && formik.errors.category_id ? (
      <FormHelperText>{formik.errors.category_id}</FormHelperText>
    ) : null}
  </FormControl>
);
export default CategoryRadio;
