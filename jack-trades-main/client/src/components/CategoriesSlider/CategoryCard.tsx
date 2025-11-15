/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { CategoriesTypes } from '../../interfaces';
import { Image } from '../index';

const CategoriesCard:FC<{ category: CategoriesTypes }> = ({ category }) => (
  <Link to={`/products/${category.name}`} className="category">
    <Box
      sx={{
        backgroundImage: `url(${category.image})`,
      }}
      className="category-img"
    >
      <Typography
        variant="h5"
        sx={{
          filter: 'brightness(110%)',
          fontWeight: 'bold',
          textTransform: 'uppercase',
        }}
      >
        {category.name}
      </Typography>
    </Box>
  </Link>
);

export default CategoriesCard;
