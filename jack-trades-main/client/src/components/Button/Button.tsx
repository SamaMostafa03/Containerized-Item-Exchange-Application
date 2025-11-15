import { FC } from 'react';
import {
  FavoriteBorder,
  ArrowForward,
  LocalMall,
  ChatBubbleOutlineRounded,
  Favorite,
} from '@mui/icons-material';
import { ButtonPropsTypes } from '../../interfaces/index';
import './Button.css';

const ButtonComponent: FC<ButtonPropsTypes> = ({
  style: {
    text, icon, classes, handleClick, disabled,
  },
}) => {
  // All Icon
  const iconsList = {
    FavoriteBorder: <FavoriteBorder />,
    ArrowForward: <ArrowForward />,
    ChatBubbleOutlineRounded: <ChatBubbleOutlineRounded />,
    LocalMall: <LocalMall />,
    Favorite: <Favorite />,
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={`${classes} ${disabled === false ? 'disabled-button' : ''}`}
      onClick={handleClick || (() => {})}
    >
      {icon ? iconsList[icon as keyof typeof iconsList] : ''}
      {text}
    </button>
  );
};

export default ButtonComponent;
