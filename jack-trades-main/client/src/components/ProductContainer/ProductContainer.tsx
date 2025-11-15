import { Box, Typography } from '@mui/material';
import { FC, useContext } from 'react';
import ProductDetailsComponent from '../ProductDetails/ProductDetails';
import ProductImage from '../ProductImage/ProductImage';
import { IProductProps } from '../../interfaces';
import './ProductContainer.css';
import { ImageContext } from '../Context/ImageContext';

const ProductContainer: FC<IProductProps> = ({
  attributes: {
    id,
    title,
    description, createdAt,
    'Category.name': categoryName,
    user_id, type,
  },
}) => {
  const context = useContext(ImageContext);

  return (
    <Box className="container">

      <Typography
        sx={{
          width: '100%',
          fontSize: '1.1rem',
        }}
        variant="subtitle2"
      >
        {categoryName}
      </Typography>

      {/* Here is the left section of the page
      that contains the main Image and the categoryName */}

      <ProductImage
        image={context.mainImage}
        title={title}
      />

      {/* Here is the Right section of the page
      that contains title, desc, Product images and the date */}

      <ProductDetailsComponent
        id={id}
        title={title}
        description={description}
        createdAt={createdAt}
        userId={user_id}
        type={type}
      />

    </Box>
  );
};

export default ProductContainer;
