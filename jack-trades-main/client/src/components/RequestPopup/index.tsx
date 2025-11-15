/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FC, useState, useContext, useEffect,
} from 'react';
import {
  Button, Modal, ImageList, ListSubheader, ImageListItem, Typography,
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import PopupCard from './PopupCard';
import { IProductPopup, UserProduct } from '../../interfaces';
import { AuthContext } from '../Context/AuthContext';
import { ImageContext } from '../Context/ImageContext';
import Loading from '../Loading/Loading';
import './Popup.css';

const RequestPopup:FC<IProductPopup> = ({ open, handleClose, receiverId }) => {
  const [products, setProducts] = useState< UserProduct[]>([]);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const { userId, fullName: senderName } = useContext(AuthContext);
  const { handleRequest, productArray } = useContext(ImageContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const userProducts = await axios
        .get(`/api/v1/user/${userId}/products`);

      setProducts(userProducts.data.rows);
      setIsLoading(false);
    } catch (error) {
      Swal.fire(error.response.data.message);
    }
  };

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  const checkArrayOfIds = () => {
    if (productArray.length) {
      setShowMessage(false);
      if (receiverId) handleRequest(receiverId, senderName);
    } else {
      setShowMessage(true);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="popupModal"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {
        isLoading ? <div><Loading className="loading" /></div>
          : products.length ? (
            <ImageList
              sx={{
                width: 700,
                height: 550,
                backgroundColor: '#fff',
                padding: '1rem',
              }}
              cols={3}
              gap={13}
            >
              <ImageListItem key="Subheader" cols={3}>
                <ListSubheader component="div">
                  Choose at least one of your products for exchange
                </ListSubheader>
              </ImageListItem>
              {products.map((item) => (
                <PopupCard item={item} key={item.id} />
              ))}
              <ImageListItem cols={3}>
                {showMessage
            && <Typography variant="h5">Choose at least one item</Typography>}
                <Button
                  variant="contained"
                  onClick={checkArrayOfIds}
                >
                  confirm

                </Button>
              </ImageListItem>

            </ImageList>

          ) : (
            <div className="add-data-pop">
              <h3>You need to add products first</h3>
              <Link to="/newProduct">
                <button type="button">Add product</button>
              </Link>
            </div>
          )
}
    </Modal>
  );
};

export default RequestPopup;
