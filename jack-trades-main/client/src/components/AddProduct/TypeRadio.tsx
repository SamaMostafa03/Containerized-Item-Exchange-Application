import { FC } from 'react';
import {
  Radio, RadioGroup, FormControlLabel,
  FormControl, FormLabel, FormHelperText,
} from '@mui/material';
import { ITypeRadioProps } from '../../interfaces';

const TypeRadio:FC<ITypeRadioProps> = ({ formik }) => (
  <FormControl
    className="type"
    error={formik.touched.type && !!formik.errors.type}
  >
    <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
    <RadioGroup
      row
      aria-labelledby="demo-row-radio-buttons-group-label"
      name="type"
      onChange={formik.handleChange}
      value={formik.values.type}
    >
      <FormControlLabel
        value="donation"
        control={<Radio />}
        label="Donation"
      />
      <FormControlLabel
        value="exchange"
        control={<Radio />}
        label="Exchange"
      />
    </RadioGroup>
    {formik.touched.type && formik.errors.type ? (
      <FormHelperText>{formik.errors.type}</FormHelperText>
    ) : null}
  </FormControl>
);
export default TypeRadio;
