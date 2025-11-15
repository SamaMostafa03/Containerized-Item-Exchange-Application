/* eslint-disable eqeqeq */
/* eslint-disable max-len */
import './UserInfo.css';
import {
  FC, useState, useContext, useEffect,
} from 'react';
import {
  Box, Typography, Avatar, Tab, Tabs,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserInfoTypes } from '../../interfaces';
import { Image, Button, Popup } from '../index';
import { AuthContext } from '../Context/AuthContext';

const UserInfo:FC<{ info: UserInfoTypes, handleIsOpen: () => void, setInfo:(info:UserInfoTypes | null) => void, }> = ({ info, handleIsOpen, setInfo }) => {
  const [value, setValue] = useState('products');
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const location = useLocation().pathname.split('/');
  const endpoint = location[location.length - 1];
  const {
    id, first_name: firstName, last_name: lastName, image, bio,
  } = info;
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue === 'products') navigate(`/profile/${id}`);
    else navigate(newValue);
  };

  useEffect(() => {
    if (endpoint === 'wishlist' || endpoint === 'requests') setValue(endpoint);
  }, []);

  return (
    <Box className="user-info">
      {image ? (
        <Image attributes={{
          src: info.image,
          alt: `An image of ${info.first_name} ${info.last_name}`,
          className: 'user-img',
        }}
        />
      ) : (
        <Avatar sx={{ bgcolor: '#B9E0FF' }} className="user-img">
          {firstName[0]}
          {lastName[0]}
        </Avatar>
      )}

      <Typography variant="h4">
        {firstName}
        {' '}
        {lastName}
      </Typography>
      <Typography>
        {bio}
      </Typography>
      <Box className="user-nav">
        <Box>
          {isPopupOpen
            && (
              <Popup
                info={info}
                isPopupOpen={isPopupOpen}
                setIsPopupOpen={setIsPopupOpen}
                setInfo={setInfo}
              />
            )}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            <Tab value="products" label="Products" />
            {userId === +info.id && <Tab value="wishlist" label="Wishlist" />}
            {userId === +info.id && <Tab value="requests" label="Requests" />}
          </Tabs>
        </Box>
        {/* ====== */}
        { userId === +info.id && (
        <Box className="profile-btn">
          <Link to="/newProduct">
            <Button style={{
              text: 'Add Product',
              classes: 'userInfoBtn',
            }}
            />
          </Link>
          <button
            type="button"
            className="userInfoBtn"
            onClick={() => setIsPopupOpen(true)}
          >
            Edit Profile
          </button>
        </Box>
        )}
        {userId !== +info.id && (
        <Box className="profile-btn">
          <button type="button" onClick={handleIsOpen}>Send message</button>
        </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserInfo;
