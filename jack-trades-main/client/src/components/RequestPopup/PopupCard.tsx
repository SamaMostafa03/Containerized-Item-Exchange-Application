import { FC, useState, useContext } from 'react';
import {
  ImageListItem, ImageListItemBar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { UserProduct } from '../../interfaces';
import { ImageContext } from '../Context/ImageContext';
import './Popup.css';

const PopupCard:FC<{ item : UserProduct }> = ({ item }) => {
  const [selected, setSelected] = useState<boolean>(false);

  const { setProductArray } = useContext(ImageContext);

  const handleItem = () => {
    if (!selected) setProductArray((prev) => [...prev, +item.id]);
    else setProductArray((prev) => prev.filter((e) => e !== +item.id));
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
