import { FC, useState } from 'react';
import {
  ImageListItem, ImageListItemBar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { IOfferedProducts } from '../../interfaces';

const PopupCard:FC<{
  item : IOfferedProducts, setProductId: (e:number)=>void
}> = ({ item, setProductId }) => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleItem = () => {
    if (!selected) setProductId(item.id);
    else setProductId(0);
    setSelected(!selected);
  };

  return (
    <ImageListItem
      className="popupCard"
      onClick={handleItem}
      sx={selected ? {
        outline: 'solid #1B4B66 4px',
      } : { outline: 'none' }}
    >
      <img
        src={`${item.gallery[0]}`}
        srcSet={`${item.gallery[0]}`}
        alt={item.title}
      />
      <ImageListItemBar
        title={item.title}
        subtitle={<Link to={`/product/${item.id}/details`}>See Details</Link>}

      />
    </ImageListItem>
  );
};

export default PopupCard;
