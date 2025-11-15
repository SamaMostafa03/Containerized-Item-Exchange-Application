import { FC, useContext } from 'react';
import { IImageProps } from '../../interfaces';
import './Image.css';
import { ImageContext } from '../Context/ImageContext';

const Image: FC <IImageProps> = ({
  attributes: {
    src, alt, className,
  },
}) => {
  const context = useContext(ImageContext);
  return (
    <img
      onMouseOver={() => {
        context.setMainImage(src);
      }}
      onFocus={() => {
        context.setMainImage(src);
      }}
      src={src}
      alt={alt}
      className={className}
    />
  );
};

export default Image;
