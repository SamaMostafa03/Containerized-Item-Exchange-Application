import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Image from '../Image/Image';
import './ImageList.css';
import { ImageContext } from '../Context/ImageContext';

const ImagesList = () => {
  const context = useContext(ImageContext);
  return (
    <Box className="ImagesContainer">
      {
    context.gallery.map((image) => (
      React.Children.toArray(
        <Image
          key={image[0]}
          attributes={{
            src: image,
            alt: 'Product Image',
            className: 'images-gallery',
          }}
        />,
      )

    ))
}
    </Box>
  );
};
export default ImagesList;
