import './CategoriesSlider.css';
import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CategoriesCard from './CategoryCard';
import { categories } from '../../StaticData';

const CategoriesSlider:FC = () => (
  <Box className="slider-container">
    <Box className="slider">
      <Typography variant="h4">
        Categories
      </Typography>
      <Grid container spacing={4}>
        {categories.map((e) => (
          <Grid key={e.name} item xs={12} md={3}>
            <CategoriesCard category={e} />
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
);

export default CategoriesSlider;
