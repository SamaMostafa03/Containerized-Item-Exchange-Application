import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import { FC } from 'react';
import { IProducts } from '../../interfaces';

const ProductsCategoryCard:FC <{ product: IProducts }> = ({ product }) => (
  <ImageListItem
    id={product.id}
    sx={{
      width: '16rem',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      marginBottom: '1rem',
    }}
  >
    <img
      style={{ height: '15rem', objectFit: 'cover' }}
      src={product.gallery[0]}
      alt={product.title}
      loading="lazy"
    />
    <ImageListItemBar
      sx={{
        padding: '5px 0 0 1.5rem', backgroundColor: '#333', color: '#FFF',
      }}
      title={product.title}
      position="below"
    />
    <ImageListItemBar
      sx={{
        backgroundColor: 'transparent', color: '#FFF',
      }}
      position="top"
      actionIcon={(
        <IconButton
          sx={{ color: 'white' }}
          aria-label="star sadfasd"
        />
        )}
    />
  </ImageListItem>
);

export default ProductsCategoryCard;
