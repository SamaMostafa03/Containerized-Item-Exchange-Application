/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Image, Button } from '../index';
import { IWishlistItem } from '../../interfaces';
import './Wishlist.css';

const WishlistCard:FC<{ product: IWishlistItem,
  fetch:()=>void }> = ({ product, fetch }) => {
  const removeFromWishlist = async () => {
    try {
      const alert = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: '#1b4b66',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!',
      });

      if (alert.isConfirmed) {
        const response = await axios
          .delete(`/api/v1/wishlist/${product.product_id}`);
        fetch();
      }
    } catch (error) {
      Swal.fire(error.response.data.message);
    }
  };

  if (!product) return <h1>Loading</h1>;
  return (
    <Box className="product-card">
      <Image attributes={{
        src: product.gallery[0],
        alt: `an image of ${product.title}`,
        className: 'product-img',
      }}
      />
      <Box className="product-details">
        <Typography
          className="title"
          id="title"
          variant="h4"
        >
          {product.title}
        </Typography>
        <Typography
          className="description"
          id="description"
        >
          {product.description}

        </Typography>
        <Link to={`/product/${product.product_id}/details`}>View details</Link>

        <Box className="buttons">
          <Button
            style={{
              text: 'Remove from wishlist',
              classes: 'wishlist-remove-btn',
              handleClick: removeFromWishlist,
            }}
          />

        </Box>
      </Box>
    </Box>

  );
};

export default WishlistCard;
